import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Button, Modal, toast } from '../../lib';
import { delFiles, onDelVisible } from '../../../reducers/files';

class Delete extends React.Component {
    static propTypes = {
        created_by: PropTypes.number.isRequired,
        value: PropTypes.object.isRequired,
        visible: PropTypes.bool,
    }
    onSubmit = () => {
        const { id, name } = this.props.value;

        this.props.delFiles({ id, created_by: this.props.created_by }).then(() => {
            this.props.onVisible();
            toast.success(name + ' 删除成功!');
        });
    }
    render() {
        if (!this.props.value) {
            return null;
        }

        return (
            <Modal
                title={this.props.value.name}
                visible={this.props.visible}
                onClose={this.props.onVisible}
                footer={
                    <>
                        <Button size='sm' value='确认' onClick={this.onSubmit} />
                        <Button size='sm' value='取消' onClick={this.props.onVisible} theme='muted' />
                    </>
                }>
                <p>你确定要删除 {this.props.value.name} 吗?</p>
            </Modal>
        );
    }
}
const mapStateToProps = ({ files, users }, props) => {
    return {
        created_by: props.created_by || users.id,
        visible: files.delVisible,
    }
}
const mapDispatchToProps = {
    delFiles,
    onVisible: onDelVisible
}
export default connect(mapStateToProps, mapDispatchToProps)(Delete)