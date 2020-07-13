import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal, toast } from '../lib';
import { http } from '@writ/utils/request-fetch';
import { onDismissModal } from '../../reducers/groups';

class Dismiss extends React.Component {
    static propTypes = {
        group: PropTypes.object.isRequired,
        created_by: PropTypes.number.isRequired
    }
    onSubmit = () => {
        const { group, created_by } = this.props;

        http.post('/grp/del', { id: group.id, created_by }).then(res => {
            if (res.code) {
                throw new Error(res.message);
            }
            this.props.onVisible();
            toast.success(group.name + ' 解散成功!');
        }).catch(err => {
            toast.error(err.message);
        });
    }
    render() {
        return (
            <Modal
                title='解散群组'
                visible={this.props.visible}
                onClose={this.props.onVisible}
                footer={
                    <>
                        <Button size='sm' value='确认' onClick={this.onSubmit} />
                        <Button size='sm' value='取消' onClick={this.props.onVisible} theme='muted' />
                    </>
                }>
                <p>你确定要解散 {this.props.group.name} 吗?</p>
            </Modal>
        );
    }
}
const mapStateToProps = function ({ groups }) {
    return {
        visible: groups.modalDismiss
    };
};
const mapDispatchToProps = {
    onVisible: onDismissModal
};
export default connect(mapStateToProps, mapDispatchToProps)(Dismiss);