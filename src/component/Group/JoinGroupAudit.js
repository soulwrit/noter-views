import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal, Text, toast } from '../lib';

import { http } from '@writ/utils/request-fetch';
import { onJoinGroupAuditModal } from '../../reducers/groups';
import getAuditMsg from '../../utils/getAuditMsg';

/**
 * 审核加入群组的申请或邀请
 */
class JoinGroupAudit extends React.Component {
    onSubmit = () => {
        const { gid, uid, req, uname, gname } = this.props.auditing;

        http.post('/mem/aud', { gid, mid: uid, req }).then((res) => {
            if (res.code) {
                throw new Error(res.msg);
            }

            this.props.onVisible();
            toast.success(getAuditMsg(req, uname, gname));
        }).catch(err => {
            toast.error(err.message);
        });
    }
    onCanacl = () => {
        this.props.onVisible()
    }
    render() {
        const { gname, uname, req } = this.props.auditing;
        const isApply = req === 2 || req === 5;

        return (
            <Modal
                visible={this.props.visible}
                onClose={this.onCanacl}
                footer={
                    <>
                        <Button size='sm' value='确认' onClick={this.onSubmit} />
                        <Button size='sm' value='取消' onClick={this.onCanacl} theme='muted' />
                    </>
                }>
                <Text>{getAuditMsg(isApply ? 1 : 4, uname, gname)}</Text>
            </Modal>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        visible: state.groups.modalJoinGroupAudit,
        auditing: state.groups.auditing,
    };
};
const mapDispatchToProps = {
    onVisible: onJoinGroupAuditModal
};
export default connect(mapStateToProps, mapDispatchToProps)(JoinGroupAudit);