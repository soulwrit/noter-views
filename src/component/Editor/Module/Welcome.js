import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Icon, Tag, List } from '@writ/react';
import styles from '../index.module.scss';
import { openFileEditor } from '../reducers/fileEditor';

const Welcome = props => {
    const { openFileEditor, visible } = props;
    const onDoubleClick = () => {
        openFileEditor(2);
    };

    return (
        <div className={classnames(styles.welcome, { non: visible })} onDoubleClick={onDoubleClick}>
            <List>
                <List.Head><Icon type='info' className={styles.welcomeIcon} />快捷操作说明</List.Head>
                <List.Item>
                    <Tag size='x1' value='alt + n' theme='dark' /> 双击欢迎页面区可新增文件
                </List.Item>
                <List.Item>
                    <Tag size='x1' value='alt + s' theme='dark' /> 保存正在编辑的文件
                </List.Item>
            </List>
        </div>
    );
}

Welcome.defaultProps = {
    visible: false
};
if (window.DEV) {
    Welcome.propTypes = {
        openFileEditor: PropTypes.func,
        visible: PropTypes.bool
    };
}
const mapStateToProps = ({ }) => {
    return {
    };
};
const mapDispatchToProps = {
    openFileEditor,
};
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);