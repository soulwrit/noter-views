import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import noop from '@writ/utils/noop';
import { Button, Modal, toast } from '@writ/react';
import { setFiles } from '../reducers/file';
import { removeOfOpenedList } from '../reducers/fileOpened';
import { closeFileSaver } from '../reducers/fileSaver';

const FileSaver = props => {
    const { closeFileSaver, created_by, onCancel, onOK, removeOfOpenedList, setFiles, value, visible } = props;
    const onSubmit = () => {
        setFiles(false, Object.assign({ created_by }, value)).then(() => {
            toast.success(`${value.name} 保存成功!`);
            closeFileSaver();
            onOK();
        });
    };
    const onClose = () => {
        removeOfOpenedList(value);
        closeFileSaver();
        onCancel();
    };

    return (
        <Modal title='文件保存' visible={visible} onClose={closeFileSaver}>
            {value ?
                <>
                    <p>是否要保存对 {value.name} 的更改?</p>
                    <p className='tar'>
                        <Button value='保存' onClick={onSubmit} />
                        <Button value='不保存' onClick={onClose} theme='warning' />
                        <Button value='取消' onClick={closeFileSaver} theme='muted' />
                    </p>
                </> :
                <>
                    <p>没有可保存的文件</p>
                    <p className='tar'>
                        <Button value='取消' onClick={closeFileSaver} theme='muted' />
                    </p>
                </>
            }
        </Modal>
    );
}
FileSaver.defaultProps = {
    onCancel: noop,
    onOK: noop,
    value: null,
    visible: false
};
if (window.DEV) {
    FileSaver.propTypes = {
        onCancel: PropTypes.func,
        onOK: PropTypes.func,
        value: PropTypes.object.isRequired,
        visible: PropTypes.bool
    };
}
const mapStateToProps = ({ files, users }) => {
    return {
        created_by: users.id,
        value: files.saver.value,
        visible: files.saver.visible,
    };
};
const mapDispathToProps = {
    closeFileSaver,
    removeOfOpenedList,
    setFiles,
};
export default connect(mapStateToProps, mapDispathToProps)(FileSaver);