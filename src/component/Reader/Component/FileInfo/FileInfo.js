import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames'; 
// import { Icon } from '@writ/react';
import styles from './FileInfo.module.scss';
import { getFileIconByClosed } from '../../../FileIcon/Icon';

const FileInfo = memo(function FileInfoRC(props) {
    const { file } = props;

    return (
        <div className={styles.info}>
            <div className={styles.icon}>{getFileIconByClosed(file, true)}</div>
            <div className={styles.name}>
                {file.name}
                <span className={styles.updateAt}>最后更新日期：{file.updated_at}</span>
            </div>
            <div className={styles.intro}>{file.intro}</div>
        </div>
    );
});
FileInfo.defaultProps = {
    file: null, 
};
if (window.DEV) {
    FileInfo.propTypes = {
        file: PropTypes.object.isRequired, 
    };
}
export { FileInfo };