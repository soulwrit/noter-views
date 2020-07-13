import React from 'react';
import { connect } from 'react-redux';
import { Modal, toast, Button, Text } from '../lib';

import { http } from '@writ/utils/request-fetch';
import { onDelNoticeModal } from '../../reducers/notice';

class Delete extends React.PureComponent {
    onSubmit = () => {
        if (!this.props.value) {
            return toast.error('请确认需要删除的通知！');
        }
        http.post('/notice/del', {
            id: this.props.value.id,
            created_by: this.props.created_by
        }).then(res => {
            if (res.code > 0) {
                return toast.error(res.msg);
            }
            toast.success('[系统通知] ' + this.props.value.title + ' 删除成功！');
            this.props.onVisible();
            this.props.onConfirm();
        }).catch(error => {
            toast.error(error.message);
        });
    }
    onCancel = () => {
        this.props.onVisible();
    }
    render() {
        return (
            <Modal title='删除通知' visible={this.props.visible} onClose={this.onCancel} footer={
                <>
                    <Button onClick={this.onSubmit}>确认</Button>
                    <Button onClick={this.onCancel} theme='muted'>取消</Button>
                </>
            }>
                <p>是否删除【系统通知】<Text value={this.props.value.title} theme='danger'/> ?</p>
            </Modal>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        visible: state.notice.modalDel,
        value: state.notice.delete,
        created_by: state.users.id
    };
};
const mapDispatchToProps = {
    onVisible: onDelNoticeModal
};
export default connect(mapStateToProps, mapDispatchToProps)(Delete);