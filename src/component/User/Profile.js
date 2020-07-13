import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, Icon, toast, Avatar, Divider, Loading, Text, Button } from '../lib';

import styles from './Profile.module.scss';
import { http } from '@writ/utils/request-fetch';
import { onProfileModal, onEditPwdModal, onEditInfoModal } from '../../reducers/users';
import { findGender } from '../../reducers/Gender';

import EditInfo from './EditInfo';
import EditPassword from './EditPassword';
import Def_Avatar from './avatar.jpg';

class Profile extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            value: null
        };
    }
    componentDidMount() {
        this.get();
    }
    get() {
        if (this.props.id) {
            http.get('/user/info', { id: this.props.id }).then(res => {
                if (res.code) {
                    throw new Error(res.msg);
                }
                this.setState({ value: res.data });
            }).catch(err => {
                toast.error(err.message);
            });
        }
    }
    onEditInfoConfirm = () => {
        this.get();
    }
    render() {
        const { visible, onVisible, editInfVisible, editPwdVisible, onEditPwd, onEditInf, id, myId } = this.props;
        const { value } = this.state;

        return (
            <Modal width={700} height={500} visible={visible} onClose={onVisible} bodyClassName={styles.warp}>
                <div className={styles.left}>
                    <div className={styles.beatyAction}>
                        <Button theme='muted'><Icon type='favorite' /> 关注</Button>
                        <Button theme='muted'><Icon type='remind' /> 发消息</Button>
                    </div>
                    {value && (
                        <div className={styles.beatyWarp}>
                            <div className={styles.beatyBox}>
                                <Avatar size='md' src={Def_Avatar} />
                                <div className={styles.uname}>
                                    <Text className={styles.name} title={value.name} value={value.name} theme='dark' size={8} /><br />
                                    <Text className={styles.intro} title={value.intro} value={value.intro} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.right}>
                    <h5 className={styles.infoTit}>
                        用户信息
                        <div className={styles.infoAction}>
                            {
                                id !== myId ? null :
                                    <>
                                        <span onClick={onEditInf} title='编辑资料'><Icon type='edit' />编辑资料 </span>
                                        <span onClick={onEditPwd} title='修改密码'><Icon type='password' />修改密码</span>
                                    </>
                            }

                            <span onClick={onVisible} className={styles.close}>
                                <Icon type='close' />退出
                            </span>
                        </div>
                    </h5>
                    {!value
                        ? <Loading placeholder='正在获取个人信息 ... ...' />
                        : <div className={styles.infoWarp}>
                            <div className={styles.infoItem} title='姓名'>
                                <Icon className={styles.infoIcon} type='account' />
                                <Text value={value.name} />
                            </div>
                            <div className={styles.infoItem} title='性别'>
                                <Icon className={styles.infoIcon} type='cry' />
                                <Text value={findGender(value.gender)} />
                            </div>
                            <div className={styles.infoItem} title='邮箱'>
                                <Icon className={styles.infoIcon} type='email' />
                                <Text value={value.email} />
                            </div>
                            <div className={styles.infoItem} title='电话'>
                                <Icon className={styles.infoIcon} type='help' />
                                <Text value={value.phone} />
                            </div>
                            <div className={styles.infoItem} title='个人简介'>
                                <Icon className={styles.infoIcon} type='form' />
                                <Text value={value.intro} />
                            </div>
                        </div>}
                    {editPwdVisible && <EditPassword />}
                    {editInfVisible && value && <EditInfo value={value} id={id} onConfirm={this.onEditInfoConfirm} />}
                    <Divider style={{ marginTop: 15, marginBottom: 5 }} />
                    <h5 className={styles.infoTit}>最新文章</h5>
                </div>
            </Modal>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        visible: state.users.modalProfile,
        editPwdVisible: state.users.modalEditPwd,
        editInfVisible: state.users.modalEditInf,
        id: state.users.activing,
        myId: state.users.id,
    };
};
const mapDispatchToProps = {
    onVisible: onProfileModal,
    onEditInf: onEditInfoModal,
    onEditPwd: onEditPwdModal
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));