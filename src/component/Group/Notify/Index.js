import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, Icon, Button, toast, Tag, Pager, Placeholder } from '../../lib';
import date from '../../../utils/date';
import { http } from '@writ/utils/request-fetch';
import { isGroupAdmin } from '../../../utils/auth';
import styles from './Index.module.scss';

import Editor from './Editor';
import Delete from './Delete';

class Notify extends React.Component {
    constructor(props) {
        super();
        this.state = {
            editor: null,
            delete: null,
            list: [],
            total: 0,
            visible: false
        };
        this.params = {
            gid: props.gid,
            pageNo: props.pageNo,
            pageSize: props.pageSize,
        };
        this.readonly = !isGroupAdmin(props.role);
    }
    componentDidMount() {
        this.getList();
    }
    getList = () => {
        http.get('/grpn', this.params).then(res => {
            if (res.code > 0) {
                throw new Error(res.msg);
            }
            this.setState({
                total: res.data.total,
                list: res.data.rows
            });
        }).catch(error => {
            toast.error(error.message);
        });
    }
    top(id, isTop) {
        http.post('/grpn/top', {
            id,
            gid: this.props.gid,
            top: isTop > 0 ? 0 : 1,
        }).then(res => {
            if (res.code > 0) {
                throw new Error(res.msg);
            }
            this.getList();
        }).catch(error => {
            toast.error(error.message);
        });
    }
    onPagerChange = (pageNo, pageSize) => {
        this.params.pageNo = pageNo;
        this.params.pageSize = pageSize;
        this.getList();
    }
    onEdit = value => {
        this.setState({
            visible: !this.state.visible,
            editor: value
        });
    }
    render() {
        const { state, params, props } = this;

        return (
            <div className={styles.box}>
                {this.readonly ? null :
                    <div className={styles.action}>
                        <Button theme='primary' size='xs' onClick={() => this.onEdit(null)}><Icon type='edit' />发布新公告</Button>
                    </div>}
                <div className={styles.content}>
                    {this.readonly ? null : state.delete
                        ? <Delete
                            id={state.delete.id}
                            gid={props.gid}
                            onCancel={() => this.setState({ delete: null })}
                            onConfirm={this.getList}
                        /> : null}
                    {this.readonly ? null : state.visible
                        ? <Editor
                            created_by={props.created_by}
                            gid={props.gid}
                            onCancel={() => this.onEdit(null)}
                            onConfirm={this.getList}
                            value={state.editor}
                            visible={state.visible}
                        /> : null}
                    {state.list.length === 0
                        ? <Placeholder value='当前没有公告' />
                        : <>
                            {state.list.map((item, index) => (
                                <div className={styles.item} key={index}>
                                    <pre>{item.top > 0 ? <Tag value='置顶' /> : null}{item.content}</pre>
                                    <div className={styles.foot}>
                                        {this.readonly ? null :
                                            <div className={styles.footLeft}>
                                                <Text
                                                    className={styles.footLeftAction}
                                                    onClick={() => this.top(item.id, item.top)} value={item.top > 0 ? '取消置顶' : '置顶'} />
                                                <Text
                                                    className={styles.footLeftAction}
                                                    onClick={() => this.onEdit(item)} value='编辑' />
                                                <Text
                                                    className={styles.footLeftAction}
                                                    onClick={() => this.setState({ delete: item })} value='删除' />
                                            </div>
                                        }
                                        <div className={styles.footRight}>
                                            {item.uname} 发表于 {date.format(item.updated_at, 'hh:mm dd-MM-yyyy')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Pager
                                total={Math.ceil(state.total / params.pageSize)}
                                pageNo={params.pageNo}
                                pageSize={params.pageSize}
                                onChange={this.onPagerChange}
                                prev={<Icon type="back" />}
                                next={<Icon type="more" />}
                            />
                        </>
                    }
                </div>
            </div>
        );
    }
}
if (window.DEV) {
    Notify.propTypes = {
        gid: PropTypes.number.isRequired,
        pageNo: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        created_by: PropTypes.number.isRequired,
    };
}
const mapStateToProps = function (state) {
    return {
        gid: 1,
        pageNo: 1,
        pageSize: 10,
        created_by: state.users.id,
        role: 0
    };
}
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(Notify);