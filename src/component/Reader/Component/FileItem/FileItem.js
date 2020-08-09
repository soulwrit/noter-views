import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'; 
// import { Icon } from '@writ/react';
import styles from './FileItem.module.scss';
import { getFileIconByClosed } from '../../../FileIcon/Icon';

const FileItem = memo(function FileItemRC(props) {
    const { file, isActived, onClick, onDoubleClick } = props;

    return (
        <div
            className={classnames(styles.item, {
                [styles.active]: isActived
            })}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
        >
            <div className={styles.icon}>{getFileIconByClosed(file, isActived)}</div>
            <div className={styles.name}>{file.name || '未命名'}</div>
        </div>
    );
});
FileItem.defaultProps = {
    file: null,
    isActived: false, 
};
if (window.DEV) {
    FileItem.propTypes = {
        file: PropTypes.object.isRequired,
        isActived: PropTypes.bool,
        onClick: PropTypes.func,
        onDoubleClick: PropTypes.func,
    };
}
export { FileItem };