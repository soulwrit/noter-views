import React from 'react';
import { connect } from 'react-redux';
import { Modal, Avatar, Button, Text, Icon, Grid, Tabs, toast, Loading, Flex, Divider } from '../lib';

import { http } from '@writ/utils/request-fetch';
import date from '../../utils/date';
import styles from './Profile.module.scss';
import Def_avatar from '../User/avatar.jpg';

import { onDismissModal, onFireMemberModal, onExitGroupModal, onGroupProfileModal } from '../../reducers/groups';
import MemberList from './MemberList';

class Profile extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            data: null
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        if (!this.props.id) return;
        try {
            http.get('/grp/det', { id: this.props.id }).then(res => {
                if (res.code) {
                    throw new Error(res.msg);
                }
                this.setState({
                    data: res.data
                });
            }).catch(err => {
                toast.error(err.message);
            });
        } catch (err) {
            toast.error(err.message);
        }
    }
    onDismiss = () => {
        this.props.onDismiss(this.state.data);
    }
    onEdit = () => {
        this.props.onEdit(this.state.data);
    }
    onExit = () => {
        this.props.onEdit({
            uid: this.props.uid,
            gid: this.props.id
        });
    }
    onMessage = () => {
        this.props.onMessage({
            uid: this.props.uid,
            gid: this.props.id
        });
    }
    onClose = () => {
        this.props.onVisible();
    }
    render() {
        const { data } = this.state;
        const { visible } = this.props;
        return (
            <Modal visible={visible} width={750} height={490} bodyClassName={styles.noPadding}>
                <span className={styles.closable} onClick={this.onClose}><Icon type='close' /></span>
                {!data
                    ? <Loading>正在获取群组信息</Loading>
                    : <Grid span={8} className={styles.box}>
                        <Grid span={3} className={styles.left}>
                            <div className={styles.middle}>
                                <Avatar src={Def_avatar} title={data.name} />
                                <p className={styles.gname}>{data.name}</p>
                                <Button size='xs' theme='light' onClick={this.onMessage}>
                                    <Icon type='skip' />发消息
                                </Button>
                            </div>
                        </Grid>
                        <Grid span={6} className={styles.right}>
                            <Tabs>
                                <Tabs.Pane className={styles.tabPane}>
                                    <Tabs.Tab>首页</Tabs.Tab>
                                    <Tabs.Tab>成员</Tabs.Tab>
                                </Tabs.Pane>
                                <Tabs.Content>
                                    <Tabs.Item className={styles.tabItem}>
                                        <Flex className={styles.dataItem}>
                                            <Flex.Item width={60}><Text value='组织介绍' /></Flex.Item>
                                            <Flex.Item span={1}>创建于{date.format(data.created_at, 'hh:mm yyyy年/MM月dd日')}：{data.intro || '组织者很懒惰，没有给出任何介绍！'}</Flex.Item>
                                        </Flex>
                                        <Flex dir='ttr' className={styles.dataItem}>
                                            <Flex.Item><Text>组织者<Divider mode='vertical' />管理员</Text></Flex.Item>
                                            <Flex.Item className={styles.adminUser}>
                                                <Avatar title={data.uname} src={Def_avatar} size='sm' style={{ marginLeft: 1 }} />
                                                <Divider mode='vertical' />
                                                {data.leaders.map((user, index) => (
                                                    user.id !== data.created_by ? (
                                                        <Avatar key={index} title={user.name} src={Def_avatar} size='xs' />
                                                    ) : null
                                                ))}
                                            </Flex.Item>
                                        </Flex>
                                        <Flex align='center'>
                                            <Flex.Item width={60}><Text value='相关操作' /></Flex.Item>
                                            <Flex.Item>
                                                <Button size='xs' theme='muted' onClick={this.onEdit}>
                                                    <Icon type='skip' style={{ marginRight: 5 }} />退出
                                                </Button>
                                                <Button size='xs' theme='danger' onClick={this.onDismiss}>
                                                    <Icon type='skip' style={{ marginRight: 5 }} />解散
                                                </Button>
                                                <Button size='xs' theme='info' onClick={this.onEdit}>
                                                    <Icon type='edit' style={{ marginRight: 5 }} />编辑
                                                </Button>
                                            </Flex.Item>
                                        </Flex>
                                    </Tabs.Item>
                                    <Tabs.Item className={styles.memberBox}>
                                        <MemberList id={data.id} value={data} />
                                    </Tabs.Item>
                                </Tabs.Content>
                            </Tabs>
                        </Grid>
                    </Grid>}
            </Modal>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        uid: state.users.id,
        visible: state.groups.modalProfile,
        id: state.groups.activing
    };
};
const mapDispatchToProps = {
    onDismiss: onDismissModal,
    onFireMember: onFireMemberModal,
    onExit: onExitGroupModal,
    onVisible: onGroupProfileModal
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);