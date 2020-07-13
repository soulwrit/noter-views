import React from 'react';
import { connect } from 'react-redux';
import { Icon, Tag, List } from '../../lib';

import styles from './index.module.scss';
import { onVisible } from '../../../reducers/files';

const Welcome = function (props) {
    return (
        <div className={styles.tips} onDoubleClick={props.onVisible}>
            <List style={{ width: '50%' }}>
                <List.Head><Icon type='info' className={styles.icon} />操作说明</List.Head>
                <List.Item>
                    <Tag value='alt + n' theme='dark' /> 双击欢迎页面区可新增文件
                    </List.Item>
                <List.Item>
                    <Tag value='alt + s' theme='dark' /> 保存正在编辑的文件
                    </List.Item>
                <List.Foot>3</List.Foot>
            </List>
        </div>
    );
}
const mapDispatchToProps = {
    onVisible
}
export default connect(null, mapDispatchToProps)(Welcome)