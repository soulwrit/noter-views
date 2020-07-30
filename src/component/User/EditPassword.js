import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, toast, Modal } from '@writ/react';

import { http } from '@writ/utils/request-fetch';
import { setUserRequired, onEditPwdModal } from './reducers';
import routes from '../routes';
import User from './User';
import styles from './index.module.scss';

class InfoEditPassword extends React.PureComponent {
    constructor() {
        super();
        this.form = Form.create({
            pwd: User.password,
            password: User.password,
            pwd2: User.pwdConfirm
        });
    }
    onUndo = () => {
        this.form.reset();
    }
    onSubmit = () => {
        try {
            const data = this.form.json();
            http.post('/user/modify/pwd', {
                id: this.props.id,
                now: data.password,
                old: data.pwd
            }).then(res => {
                if (res.code) {
                    throw new Error(res.msg);
                }
                this.props.setUserRequired({
                    id: res.data.id,
                    token: res.data.token,
                    localize: false
                });
                this.props.onVisible();
                this.props.history.push(routes.login.path);
            }).catch(err => {
                toast.error(err.message);
            });
        } catch (err) {
            toast.error(err.message);
        }
    }
    render() {
        const { fields } = this.form;

        return (
            <Modal visible={this.props.visible} width={400} onClose={this.props.onVisible}>
                <Form onSubmit={this.onSubmit} labelClassName={styles.pwdLab} style={{ marginTop: 15 }}>
                    <Form.Item label='当前密码' model={fields.pwd}>
                        <Input type="password" model={fields.pwd} />
                    </Form.Item>
                    <Form.Item label='确认密码' model={fields.password}>
                        <Input type="password" model={fields.password} placeholder='请输入新密码' />
                    </Form.Item>
                    <Form.Item label='输入密码' model={fields.pwd2}>
                        <Input type="password" model={fields.pwd2} />
                    </Form.Item>
                    <Form.Item label=' '>
                        <Button value='保存' />
                        <Button value='撤销' type='button' theme='muted' onClick={this.onUndo} />
                        <Button value='退出' type='button' theme='muted' onClick={this.props.onVisible} />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        id: state.users.id,
        visible: state.users.modalEditPwd
    };
};
const mapDispatchToProps = {
    setUserRequired,
    onVisible: onEditPwdModal
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InfoEditPassword));