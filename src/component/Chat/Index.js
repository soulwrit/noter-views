import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Modal, Tabs, Icon, Avatar, Text, Placeholder } from '../lib';

import styles from './Index.module.scss';
import date from '../../utils/date';
import { onGroupModal, onGroupProfileModal } from '../../reducers/groups';
import { onProfileModal as onUserProfileModal } from '../../reducers/users';
import { onMaximize, onVisible, setActivityIndex, delActivity } from '../../reducers/chat';

import Def_Avatar from '../User/avatar.jpg';
import GroupChat from './GroupChat';
import ChatBox from './ChatBox';

class Layout extends React.Component {
    constructor() {
        super();
    }
    onClose = (e, item) => {
        e.stopPropagation();
        this.props.delActivity(item.id);
    }
    onChange = index => {
        this.props.setActivityIndex(index);
    }
    onName = item => {
        item.type === 0 ? this.props.onGroupProfile(item.id) : this.props.onUserProfile(item.id);
    }
    render() {
        const {
            visible, viewport, maximized,
            onVisible, onMaximize, onGroup,
            activity, index
        } = this.props;
        const current = activity[index];
        const noMessage = !activity || activity.length === 0 || !current;

        return (
            <Modal bodyClassName={styles.box} visible={visible} width={viewport.width} height={viewport.height}>
                <div className={styles.head}>
                    <div className={styles.headLeft}>
                        <span className={styles.title} onClick={onGroup} title='点击进入群组列表'>我的群组</span>
                    </div>
                    <div className={styles.headCenter}>
                        {noMessage ? null : <h5 className={styles.headName} onClick={() => this.onName(current)}>{current.name}</h5>}
                    </div>
                    <div className={styles.headRight}>
                        <span className={styles.headAction} onClick={onMaximize}>
                            <Icon type={maximized ? 'form' : 'all'} />
                        </span>
                        <span className={styles.headAction} onClick={onVisible}>
                            <Icon type='close' />
                        </span>
                    </div>
                </div>
                {noMessage ? <Placeholder value='这人很闭塞，竟然与谁也不存在交集 ... ...' className={styles.body} /> :
                    <Tabs mode='vertical' className={styles.body} onChange={this.onChange} index={index}>
                        <Tabs.Pane className={styles.tabPane}>
                            {activity.map((item, key) => (
                                <Tabs.Tab key={key} className={classnames(styles.tabName, key === index ? styles.tabNameActive : null)}>
                                    <div className={styles.tabNameLeft}>
                                        <Avatar size='sm' src={item.avatar || Def_Avatar} />
                                    </div>
                                    <div className={styles.tabNameCenter}>
                                        <Text value={item.name} type='h5' theme='dark' title={item.name} />
                                        <Text value={item.latestMessage} type='p' className={styles.tabNameIntro} />
                                    </div>
                                    <div className={styles.tabNameRight}>
                                        <Text value={date.getPersonalTime(item.latestCreatedAt)} type='p' />
                                        <Icon type='close' size='2x' onClick={e => this.onClose(e, item)} className={styles.tabNameClose} />
                                    </div>
                                </Tabs.Tab>
                            ))}
                        </Tabs.Pane>
                        <Tabs.Content>
                            {activity.map((item, key) => (
                                <Tabs.Item key={key} className={styles.tabItem}>
                                    {item.type === 0 ? <GroupChat value={item} /> : <ChatBox value={item} type={item.type} />}
                                </Tabs.Item>
                            ))}
                        </Tabs.Content>
                    </Tabs>}
            </Modal>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        visible: state.chat.visible,
        viewport: state.chat.viewport[state.chat.maximized],
        maximized: state.chat.maximized,
        activity: state.chat.activity,
        index: state.chat.activityIndex
    };
}
const mapDispatchToProps = {
    onMaximize, onVisible,
    onGroup: onGroupModal,
    onGroupProfile: onGroupProfileModal,
    onUserProfile: onUserProfileModal,
    setActivityIndex,
    delActivity
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
