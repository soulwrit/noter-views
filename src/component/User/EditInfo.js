import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Radio, Button, toast, Avatar, Modal } from '@writ/react';

import { onEditInfoModal } from './reducers';
import { http } from '@writ/utils/request-fetch';
import genders from '../../reducers/Gender';
import User from './User';

import styles from './index.module.scss';
import defaultAvatar from './avatar.jpg';

class InfoEdit extends React.PureComponent {
    constructor(props) {
        super();
        this.form = Form.create({
            name: User.name,
            intro: User.intro,
            email: User.email,
            phone: User.phone,
            gender: User.gender,
        }, props.value);
        this.cached = Object.assign({}, props.value);
    }
    onUndo = () => {
        if (!this.props.value) {
            return toast.success('不存在可编辑的个人信息！');
        }

        this.form.setValue(this.cached);
    }
    onSubmit = () => {
        try {
            const { value } = this.props;

            if (!value) {
                return toast.success('不存在可编辑的个人信息！');
            }

            let modified;
            const data = { id: value.id };
            const edited = this.form.json(false);
            for (const key in edited) {
                if (edited[key] !== this.cached[key]) {
                    modified = true;
                    data[key] = edited[key];
                }
            }
            if (!modified) {
                return toast.warn('请先编辑个人信息，再进行提交');
            }

            http.post('/user/modify', data).then(res => {
                if (res.code) {
                    throw new Error(res.msg);
                }
                
                this.cached = Object.assign(this.cached, data);
                toast.success('用户信息修改成功!');
                this.props.onVisible();
                this.props.onConfirm();
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
            <Modal visible={this.props.visible} width={500} onClose={this.props.onVisible}>
                <Form isRow labelClassName={styles.labelStyle}>
                    <Form.Item label='头像'>
                        <Avatar size='md' src={defaultAvatar} />
                    </Form.Item>
                    <Form.Item model={fields.name} span={9}>
                        <Input type="text" model={fields.name} />
                    </Form.Item>
                    <Form.Item model={fields.gender}>
                        <Radio.Group name='gender' model={fields.gender}>
                            {genders.map((gender, index) =>
                                <Radio text={gender.name} value={gender.name} key={index} />
                            )}
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item model={fields.email} span={9}>
                        <Input type="text" model={fields.email} />
                    </Form.Item>
                    <Form.Item model={fields.phone} span={9}>
                        <Input type="text" model={fields.phone} />
                    </Form.Item>
                    <Form.Item model={fields.intro}>
                        <Input.Textarea model={fields.intro} />
                    </Form.Item>
                    <Form.Item label=' '>
                        <Button value='保存' onClick={this.onSubmit} />
                        <Button value='撤销' onClick={this.onUndo} theme='muted' />
                        <Button value='退出' onClick={this.props.onVisible} theme='muted' />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        id: state.users.id,
        visible: state.users.modalEditInf
    };
};
const mapDispatchToProps = {
    onVisible: onEditInfoModal
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoEdit);