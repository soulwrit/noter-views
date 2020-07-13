import React from 'react';
import { connect } from 'react-redux';
import { Icon, Text, toast, Pager, Placeholder } from '../lib';

import styles from './Index.module.scss';
import date from '../../utils/date';
import { http } from '@writ/utils/request-fetch';
import { onEditFeedbackModal, onDelFeedbackModal } from '../../reducers/feedback';

import Editor from './Editor';
import Delete from './Delete';

class Index extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {
            list: [],
            total: 0,
        };
        this.listParams = {
            pageNo: 1,
            pageSize: 10,
            created_by: props.created_by
        };
    }
    componentDidMount() {
        this.getList();
    }
    getList = () => {
        http.get('/feedback', this.listParams).then(res => {
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
        const { modalDel, onDelete, onEdit } = this.props;

        return state.total === 0 ? <Placeholder value='没有反馈信息' /> : (
            <>
                {state.list.map((item, index) => {
                    return (
                        <div className={styles.item} key={index}>
                            <div className={styles.tit}>
                                <Text theme='dark' value={item.title} title={item.title} />
                                <Text className={styles.act} onClick={() => onDelete(item)}>
                                    <Icon type='delete' className={styles.ico} /> 删除
                                </Text>
                                <Text className={styles.act} onClick={() => onEdit(item)}>
                                    <Icon type='edit' className={styles.ico} /> 编辑
                                </Text>
                            </div>
                            <div className={styles.det}>
                                <pre>{item.content}</pre>
                                <Text className={styles.time} value={date.format(item.updated_at, 'hh:mm dd/MM/yyyy')} />
                            </div>
                        </div>
                    );
                })}
                <Pager
                    total={Math.ceil(state.total / listParams.pageSize)}
                    pageNo={listParams.pageNo}
                    pageSize={listParams.pageSize}
                    onChange={this.onPagerChange}
                    prev={<Icon type="back" />}
                    next={<Icon type="more" />}
                />
                {modalDel ? <Delete onConfirm={this.getList} /> : null}
            </>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        created_by: state.users.id,
        modalDel: state.feedback.modalDel,
    };
};
const mapDispatchToProps = {
    onEdit: onEditFeedbackModal,
    onDelete: onDelFeedbackModal
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);