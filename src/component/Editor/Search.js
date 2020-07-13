import React from 'react';
import { connect } from 'react-redux';

import { Icon, Input, Form, toast, List } from '../lib';
import fs from '../../utils/fs';
import { http } from '@writ/utils/request-fetch';
import { setActivate, addEditFiles } from '../../reducers/files';
import styles from './index.module.scss';

class Search extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.form = Form.create({
            keyword: {
                default: '',
                placeholder: '请输入关键词',
                validate(value) {
                    if (!value.length) {
                        return '请输入检索关键词';
                    }
                }
            }
        });
    }
    getFiles() {
        try {
            const { keyword } = this.form.json(false);
            if (!keyword) {
                return toast.error('请输入关键词');
            }

            http.get('/files', {
                type: 2,
                created_by: this.props.created_by,
                name: keyword
            }).then(res => {
                if (res.code) {
                    throw new Error(res.msg);
                }

                if (!res.data.length) {
                    toast.warn('没有检索到相关的资源.');
                }
                this.setState({
                    list: res.data
                });
            }).catch(err => {
                toast.error(err.message);
            });
        } catch (err) {
            toast.error(err.message);
        }
    }
    onRefresh = () => this.getFiles();
    onSubmit = e => {
        if (e.keyCode !== 13) {
            return;
        }
        this.getFiles();
    }
    onClear = () => {
        this.form.reset();
        this.setState({
            list: []
        });
    }
    onClick = file => {
        this.props.setActivate(file);
        this.props.addEditFiles(file);
    }
    render() {
        const { form, state } = this;

        return (
            <>
                <div className={styles.menuHead}>
                    <div className={styles.menuTitle}>资源检索</div>
                    <div className={styles.menuAction}>
                        <Icon type='refresh' title='刷新资源列表' onClick={this.onRefresh} />
                        <Icon type='close' title='清空检索结果' onClick={this.onClear} />
                    </div>
                </div>
                <div className={styles.menuBody} style={{ padding: '5px 10px' }} onKeyUp={this.onSubmit}>
                    <Form>
                        <Form.Item model={form.fields.keyword}>
                            <Input model={form.fields.keyword} className={styles.searchEnter} />
                        </Form.Item>
                    </Form>
                    {state.list.length
                        ? <List>{state.list.map((file, index) =>
                            <List.Item key={index} onClick={() => this.onClick(file)} style={{ cursor: 'pointer' }}>
                                <Icon type={fs.getIcon(file)} size='2x' />
                                <span style={{ marginLeft: 6 }}>{file.name} {fs.extname(file.type) || ''}</span>
                            </List.Item>
                        )} </List>
                        : <div className={styles.searchNoData}>没有检索到相关文件</div>
                    }
                </div>
            </>
        );
    }
}
const mapStateToProps = ({ users }) => {
    return {
        created_by: users.id
    };
};
const mapDispatchToProps = {
    setActivate,
    addEditFiles
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);