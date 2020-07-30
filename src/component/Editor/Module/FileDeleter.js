import { useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { toast, confirm } from '@writ/react';
import { closeFileDeleter } from '../reducers/fileDeleter';
import { removeOfOpenedList } from '../reducers/fileOpened';
import { delFiles, } from '../reducers/file';

const FileDeleter = props => {
    const { created_by, removeOfOpenedList, delFiles, onClose, value, visible } = props;

    useEffect(() => {
        if (!visible || !value) return;

        confirm(`你确定要删除资源：${value.name} 吗?`).then(flag => {
            if (!flag) return onClose();
            const { id, name } = value;

            delFiles({ id, created_by }).then(() => {
                removeOfOpenedList(value);
                onClose();
                toast.success(`资源：${name} 删除成功!`);
            });
        });
    }, [value, visible]);

    return null;
}
FileDeleter.defaultProps = {
    created_by: void 0,
    delFiles: void 0,
    value: null,
    visible: false,
};
if (window.DEV) {
    FileDeleter.propTypes = {
        created_by: PropTypes.number.isRequired,
        delFiles: PropTypes.func,
        value: PropTypes.object.isRequired,
        visible: PropTypes.bool,
    };
}
const mapStateToProps = ({ files, users }) => {
    return {
        created_by: users.id,
        value: files.deleter.value,
        visible: files.deleter.visible,
    }
};
const mapDispatchToProps = {
    delFiles,
    onClose: closeFileDeleter,
    removeOfOpenedList,
};
export default connect(mapStateToProps, mapDispatchToProps)(FileDeleter);