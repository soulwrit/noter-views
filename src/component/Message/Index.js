import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Tabs, Modal, Icon, Text } from '@writ/react';

import styles from './Index.module.scss';
import { onMessageModal } from '../../reducers/message';
import { onEditNoticeModal } from '../../reducers/notice';
import { onEditFeedbackModal } from '../../reducers/feedback';

import AuditMsg from '../Group/AuditMsg';
import Notice from '../Notice/Index';
import UserFeedback from '../UserFeedback/Index';

const Message = props => {
    const { onEditNotice, onEditFeedback, onMessageModal, tabIndex, visible } = props;
    const [index, setIndex] = useState(tabIndex);

    return (
        <Modal width={800} height={500} visible={visible} onClose={onMessageModal} bodyClassName={styles.mdlBody}>
            <Tabs
                onChange={setIndex} index={tabIndex}
                extra={
                    <>
                        {{
                            1: <span className={styles.tabExtra} onClick={() => onEditNotice()}>
                                <Icon type='edit' size='2x' className={styles.tabExtraIcon} />
                                <Text value='抄写公告' />
                            </span>,
                            2: <span className={styles.tabExtra} onClick={() => { onEditFeedback(); }}>
                                <Icon type='edit' size='2x' className={styles.tabExtraIcon} />
                                <Text value='意见反馈' />
                            </span>
                        }[index]}
                        <span className={styles.tabExtraClose} onClick={onMessageModal}>
                            <Icon type='close' size='3x' />
                        </span>
                    </>
                }
            >
                <Tabs.Pane className={styles.tabPane}>
                    <Tabs.Tab>验证消息</Tabs.Tab>
                    <Tabs.Tab>系统通知</Tabs.Tab>
                    <Tabs.Tab>意见反馈</Tabs.Tab>
                </Tabs.Pane>
                <Tabs.Content>
                    <Tabs.Item className={styles.tabItem}><AuditMsg /></Tabs.Item>
                    <Tabs.Item className={styles.tabItem}><Notice /></Tabs.Item>
                    <Tabs.Item className={styles.tabItem}><UserFeedback /></Tabs.Item>
                </Tabs.Content>
            </Tabs>
        </Modal>
    );
}

const mapStateToProps = function (state) {
    return {
        visible: state.message.visible,
        tabIndex: 0
    };
};
const mapDispatchToProps = {
    onVisible: onMessageModal,
    onEditNotice: onEditNoticeModal,
    onEditFeedback: onEditFeedbackModal
};
export default connect(mapStateToProps, mapDispatchToProps)(Message);