import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal, toast } from '../lib';
import { http } from '@writ/utils/request-fetch';
import { onExitGroupModal } from '../../reducers/groups';

class ExitGroup extends React.Component {
    static propTypes = {
        group: PropTypes.object.isRequired,
        id: PropTypes.number.isRequired
    }
    onSubmit = () => {
        const { group, id } = this.props;

        http.post('/mem/exit', { gid: group.id, id }).then((res) => {
            if (res.code) {
                throw new Error(res.msg);
            }

            this.props.onVisible();
            toast.success(`您已经退出了群组(${group.name})。`);
        }).catch(err => {
            toast.error(err.message);
        });
    }
    render() {
        const { group } = this.props;

        return (
            <Modal
                title='退出群组'
                visible={this.props.visible}
                onClose={this.props.onVisible}
                footer={
                    <>
                        <Button size='sm' value='确认' onClick={this.onSubmit} />
                        <Button size='sm' value='取消' onClick={this.props.onVisible} theme='muted' />
                    </>
                }>
                <p>您确定要退出群组 {group.name} 吗?</p>
            </Modal>
        );
    }
}
const mapStateToProps = function ({ groups }) {
    return {
        visible: groups.modalExitGroup
    };
};
const mapDispatchToProps = {
    onVisible: onExitGroupModal
};
export default connect(mapStateToProps, mapDispatchToProps)(ExitGroup);