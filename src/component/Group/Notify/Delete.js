import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, Button, toast } from '../../lib';
import { http } from '@writ/utils/request-fetch';

class Delete extends React.PureComponent {
    onSubmit = () => {
        if (!this.props.id) {
            return toast.error('请确认需要删除的通知！');
        }
        http.post('/grpn/del', {
            id: this.props.id,
            gid: this.props.gid
        }).then(res => {
            if (res.code > 0) {
                return toast.error(res.msg);
            }
            toast.success('[组织公告] 删除成功！');
            this.props.onConfirm();
            this.props.onCancel();
        }).catch(error => {
            toast.error(error.message);
        });
    }
    render() {
        return (
            <Modal title='删除提示' visible={true} onClose={this.props.onCancel} footer={
                <>
                    <Button onClick={this.onSubmit}>确认</Button>
                    <Button onClick={this.props.onCancel} theme='muted'>取消</Button>
                </>
            }>
                <Text value='确认要删除本条群公告？' theme='danger' />
            </Modal>
        );
    }
}
if (window.DEV) {
    Delete.propTypes = {
        id: PropTypes.number.isRequired,
        gid: PropTypes.number.isRequired,
    };
}
export default Delete;