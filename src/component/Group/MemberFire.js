import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal, toast, Text } from '../lib';
import { http } from '@writ/utils/request-fetch';
import { onFireMemberModal } from '../../reducers/groups';

class MemberFire extends React.Component {
    static propTypes = {
        group: PropTypes.object.isRequired,
        member: PropTypes.object.isRequired,
        created_by: PropTypes.number.isRequired,
    }
    onSubmit = () => {
        const { group, member, created_by } = this.props;

        http.post('/mem/del', { id: group.id, created_by, member: member.id }).then((res) => {
            if (res.code) {
                throw new Error(res.msg);
            }

            this.props.onVisible();
            toast.success(`已把成员(${member.name})踢出群组(${group.name})。`);
        }).catch(err => {
            toast.error(err.message);
        });
    }
    render() {
        const { group, member } = this.props;
        return (
            <Modal
                title='成员踢出'
                visible={this.props.visible}
                onClose={this.props.onVisible}
                footer={
                    <>
                        <Button size='sm' value='确认' onClick={this.onSubmit} />
                        <Button size='sm' value='取消' onClick={this.props.onVisible} theme='muted' />
                    </>
                }>
                <p>您确定要成员({member.mnane})踢出群组 <Text>{group.gname}</Text> 吗?</p>
            </Modal>
        );
    }
}
const mapStateToProps = function ({ groups }) {
    return {
        visible: groups.modalFireMember
    };
};
const mapDispatchToProps = {
    onVisible: onFireMemberModal
};
export default connect(mapStateToProps, mapDispatchToProps)(MemberFire);