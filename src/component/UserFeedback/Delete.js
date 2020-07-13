import React from 'react';
import { connect } from 'react-redux';
import { Text, toast, confirm } from '../lib';

import { http } from '@writ/utils/request-fetch';
import { onDelFeedbackModal } from '../../reducers/feedback';

const DeleteUserFeedback = props => {
    const { created_by, onConfirm, value } = props;
    confirm(
        <p>
            您确定要删除此则反馈消息（<Text value={value.title} theme='danger' />）?
        </p>,
        {
            title: '删除反馈'
        }
    ).then(isConfirm => {
        if (isConfirm) {
            if (!value) {
                return toast.error('请确认需要删除的反馈信息！');
            }
            http.post('/feedback/del', {
                id: value.id,
                created_by: created_by
            }).then(res => {
                if (res.code > 0) {
                    throw new Error(res.msg);
                }
                onConfirm();
                toast.success('反馈信息删除成功！');
            }).catch(error => {
                toast.error(error.message);
            });
        }
    });

    return null;
}

const mapStateToProps = function (state) {
    return {
        created_by: state.users.id,
        modalDel: state.feedback.modalDel,
        value: state.feedback.delete
    };
};
const mapDispatchToProps = {
    onVisible: onDelFeedbackModal
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteUserFeedback);