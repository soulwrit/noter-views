import React from 'react';
import { connect } from 'react-redux';
import { Icon, Input, Form, toast, List, Slot } from '@writ/react';
import { http } from '@writ/utils/request-fetch';

import styles from '../index.module.scss';
import fs from '../fs';
import { appendToOpenedList } from '../reducers/fileOpened';

class Search extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }
    getFiles() {
        try {
            const { created_by, form } = this.props;
            const { keyword } = form.json(false);

            http.get('/files', {
                type: 2,
                created_by,
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
        this.props.form.reset();
        this.setState({
            list: []
        });
    }
    onClick = file => {
        this.props.appendToOpenedList(file);
    }
    render() {
        const { form, } = this.props;
        const state = this.state;

        return (
            <>
                <Slot name='menuTitle'>资源检索</Slot>
                <Slot name='menuAction'>
                    <Icon type='refresh' title='刷新资源列表' onClick={this.onRefresh} />
                    <Icon type='close' title='清空检索结果' onClick={this.onClear} />
                </Slot>
                <Slot name='menuContent'>
                    <div className={styles.menuBody} onKeyUp={this.onSubmit}>
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
                </Slot>
            </>
        );
    }
}
const mapStateToProps = ({ users }) => {
    return {
        created_by: users.id,
        form: Form.create({
            keyword: {
                default: '',
                placeholder: '请输入关键词',
                validate(value) {
                    if (!value.length) {
                        return '请输入检索关键词';
                    }
                }
            }
        })
    };
};
const mapDispatchToProps = {
    appendToOpenedList
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);