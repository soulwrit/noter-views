import React from 'react';
import { connect } from 'react-redux';
import { Icon, toast, Pager, Text, Divider, Placeholder } from '../lib';

import styles from './index.module.scss';
import date from '../../utils/date';
import { http } from '@writ/utils/request-fetch';

import { onDelNoticeModal, onEditNoticeModal } from '../../reducers/notice';
import Delete from './Delete';
import Editor from './Editor';

class Notice extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            list: [],
            total: 0,
            index: 0
        };
        this.listParams = {
            pageNo: 1,
            pageSize: 10
        };
    }
    componentDidMount() {
        this.getList();
    }
    getList = () => {
        http.get('/notice', this.listParams).then(res => {
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
    onPagerChange = (pageNo, pageSize) => {
        this.listParams.pageNo = pageNo;
        this.listParams.pageSize = pageSize;
        this.getList();
    }
    render() {
        const { state, listParams } = this;
        const { modalDel, modalEdit, onDelete, onEdit } = this.props;

        return state.total === 0 ? <Placeholder value='暂无系统通知' /> : (
            <>
                {state.list.map((item, index) => (
                    <div className={styles.item} key={index}>
                        <div className={styles.time}>
                            <Text value={date.format(item.updated_at, 'hh:mm dd/MM/yyyy')} />
                            <div className={styles.acts}>
                                <span className={styles.act} onClick={() => onDelete(item)}>
                                    <Icon type='delete' className={styles.ico} />
                                    <Text value='删除' />
                                </span>
                                <span className={styles.act} onClick={() => onEdit(item)}>
                                    <Icon type='edit' className={styles.ico} />
                                    <Text value=' 编辑' />
                                </span>
                            </div>
                        </div>
                        <div className={styles.tit} title={item.title}>{item.title}</div>
                        <div className={styles.det}>
                            <pre>{item.content}</pre>
                        </div>
                        <Divider type='dashed' style={{ margin: 0 }} />
                    </div>
                ))}
                <Pager
                    total={Math.ceil(state.total / listParams.pageSize)}
                    pageNo={listParams.pageNo}
                    pageSize={listParams.pageSize}
                    onChange={this.onPagerChange}
                    prev={<Icon type="back" />}
                    next={<Icon type="more" />}
                />
                {modalDel ? <Delete onConfirm={this.getList} /> : null}
                {modalEdit ? <Editor onConfirm={this.getList} /> : null}
            </>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        created_by: state.users.id,
        modalDel: state.notice.modalDel,
        modalEdit: state.notice.modalEdit,
    };
};
const mapDispatchToProps = {
    onDelete: onDelNoticeModal,
    onEdit: onEditNoticeModal
};
export default connect(mapStateToProps, mapDispatchToProps)(Notice);