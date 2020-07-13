import React from 'react';
import { connect } from 'react-redux';

import { Button, Modal, toast } from '../../lib';
import { setFiles, delEditFiles, onSaveVisible } from '../../../reducers/files';

class Save extends React.PureComponent {
    onSubmit = () => {
        this.props.setFiles(false, this.props.value).then(() => {
            toast.success(`${this.props.value.name} 保存成功!`);
            this.props.onVisible();
        });
    }
    onClose = () => {
        this.props.delEditFiles(this.props.value);
        this.props.onSaveVisible();
    }
    render() {
        return (
            <Modal
                title='文件保存'
                visible={this.props.visible}
                onClose={this.props.onVisible}
                footer={
                    <>
                        <Button value='保存' onClick={this.onSubmit} />
                        <Button value='不保存' onClick={this.onClose} theme='warning' />
                        <Button value='取消' onClick={this.props.onVisible} theme='muted' />
                    </>
                }>
                是否保存文件 {this.props.value.name} ?
            </Modal>
        );
    }
}

const mapStateToProps = ({ files }, props) => {
    return {
        values: files.edited,
        visible: files.saveVisible,
        value: props.value || files.activate
    };
};
const mapDispathToProps = {
    onVisible: onSaveVisible,
    setFiles,
    delEditFiles
};

export default connect(mapStateToProps, mapDispathToProps)(Save);