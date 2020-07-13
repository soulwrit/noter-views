import React from 'react';
import { connect } from 'react-redux';
import { Tabs, ElegantEditor, Tooltips, Grid } from '../lib';
import styles from './GroupChat.module.scss';

import ChatBox from './ChatBox';
import GroupNotify from '../Group/Notify/Index';


class GroupChat extends React.PureComponent {
    constructor(props) {
        super();
        this.state = {};
    }
    render() {
        return (
            <Tabs index={3}>
                <Tabs.Pane className={styles.tabPane}>
                    <Tabs.Tab>聊天</Tabs.Tab>
                    <Tabs.Tab>公告</Tabs.Tab>
                    <Tabs.Tab>文件</Tabs.Tab>
                    <Tabs.Tab>设置</Tabs.Tab>
                </Tabs.Pane>
                <Tabs.Content>
                    <Tabs.Item className={styles.tabItem}><ChatBox /></Tabs.Item>
                    <Tabs.Item className={styles.tabItem}><GroupNotify /></Tabs.Item>
                    <Tabs.Item className={styles.tabItem}>组织文件</Tabs.Item>
                    <Tabs.Item className={styles.tabItem}>
                      
                        <ElegantEditor onChange={e => {
                            console.log(e);
                        }} />
                    </Tabs.Item>
                </Tabs.Content>
            </Tabs>
        );
    }
}
const mapStateToProps = function (state) {
    return {};
};
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(GroupChat);