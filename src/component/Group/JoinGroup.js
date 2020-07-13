import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal, Text, toast } from '../lib';
import { http } from '@writ/utils/request-fetch';
import { onJoinGroupModal } from '../../reducers/groups';

/**
 * 加入群组的申请或者邀请
 */
class JoinGroup extends React.PureComponent {
    static propTypes = {
        group: PropTypes.object.isRequired,
        member: PropTypes.object.isRequired,
        uid: PropTypes.number
    }
    onSubmit = () => {
        const { group, member, uid } = this.props;

        http.post('/mem/req', { gid: group.id, mid: member.id, uid }).then((res) => {
            if (res.code) {
                throw new Error(res.msg);
            }
            this.props.onVisible();
            toast.success(uid > 0
                ? `您已经对用户（${member.name}）发出了加入群组（${group.name}）的邀请，静等其同意吧！`
                : `已经成功发出了加入群组（${group.name}）的请求消息，静等群组管理员审批吧！`
            );
        }).catch(err => {
            toast.error(err.message);
        });
    }
    render() {
        const { group, uid, member } = this.props;

        return (
            <Modal
                title={uid > 0 ? '加入群组的邀请' : '加入群组的申请'}
                visible={this.props.visible}
                onClose={this.props.onVisible}
                footer={
                    <>
                        <Button size='sm' value='确认' onClick={this.onSubmit} />
                        <Button size='sm' value='取消' onClick={this.props.onVisible} theme='muted' />
                    </>
                }>
                <Text>
                    {uid > 0 ? `您正在邀请用户（${member.name}）加入您的群组（${group.name}），请确认？`
                        : `您正在申请加入群组（${group.name}）， 请确认？`}
                </Text>
            </Modal>
        );
    }
}
const mapStateToProps = function ({ groups }) {
    return {
        visible: groups.modalJoinGroup
    };
};
const mapDispatchToProps = {
    onVisible: onJoinGroupModal
};
export default connect(mapStateToProps, mapDispatchToProps)(JoinGroup);