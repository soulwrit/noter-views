import React from 'react';
import { connect } from 'react-redux';
import { Modal, toast, Form, Input, Button } from '../lib';

import { http } from '@writ/utils/request-fetch';
import { onEditNoticeModal } from '../../reducers/notice';

class Editor extends React.PureComponent {
    constructor(props) {
        super();
        this.form = Form.create({
            title: {
                placeholder: '请输入通知标题',
                label: '通知标题',
                default: '',
                validate(value) {
                    if (!value) {
                        return '请输入通知标题';
                    }
                    if (value.length > 50) {
                        return '通知标题不超过50个字符'
                    }
                }
            },
            content: {
                placeholder: '请输入通知内容',
                label: '通知内容',
                default: '',
                validate(value) {
                    if (!value) {
                        return '请输入通知的内容';
                    }
                }
            }
        }, props.value);
    }
    onSubmit = () => {
        try {
            const data = Object.assign({
                created_by: this.props.created_by,
                id: this.props.value ? this.props.value.id : undefined
            }, this.form.json());

            http.post(data.id ? '/notice/upd' : '/notice/add', data).then(res => {
                if (res.code) {
                    throw new Error(res.msg);
                }
                toast.success(data.id ? '通知修改成功！' : '[系统通知] 抄送成功！');
                this.onConfirm();
                this.onCancel();
            }).catch(error => {
                toast.error(error.message);
            });
        } catch (error) {
            toast.error(error.message);
        }
    }
    onCancel = () => {
        this.props.onVisible();
    }
    onConfirm = ()=>{
        if (this.props.onConfirm){
            this.props.onConfirm();
        }
    }
    render() {
        return (
            <Modal visible={this.props.visible} onClose={this.onCancel} title='抄写通知' width={500}>
                <Form onSubmit={this.onSubmit} style={{ marginTop: 7 }}>
                    <Form.Item model={this.form.fields.title}>
                        <Input model={this.form.fields.title} maxLength={50} />
                    </Form.Item>
                    <Form.Item model={this.form.fields.content}>
                        <Input.Textarea model={this.form.fields.content} rows={4} />
                        <div style={{ marginTop: 10 }}>
                            <Button size='md'>发送</Button>
                            <Button size='md' theme='muted' type='button' onClick={this.onCancel}>返回</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        created_by: state.users.id,
        value: state.notice.editor,
        visible: state.notice.modalEdit
    };
};
const mapDispatchToProps = {
    onVisible: onEditNoticeModal
};
export default connect(mapStateToProps, mapDispatchToProps)(Editor);