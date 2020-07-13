import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Form, Modal, toast, Text } from '../lib';
import { onEditFeedbackModal } from '../../reducers/feedback';
import { http } from '@writ/utils/request-fetch';

class Editor extends React.PureComponent {
    constructor(props) {
        super();
        console.log(props.value);
        this.state = { size: props.value ? props.value.content.length : 0 };
        this.form = Form.create({
            title: {
                placeholder: '请输入关键词',
                validate(value) {
                    if (!value) {
                        return '请输入关键词';
                    }
                    if (value.length > 50) {
                        return '关键词不超过50个字符'
                    }
                }
            },
            content: {
                placeholder: '请输入您的想法',
                validate(value) {
                    if (!value || value.length === 0) {
                        return '请输入您的想法';
                    }
                    if (value.length > props.maxLength) {
                        return '最多能输入' + props.maxLength + '个字符';
                    }
                }
            }
        }, props.value);
    }
    onChange = () => this.setState({
        size: this.form.fields.content.size,
    });
    onSubmit = () => {
        try {
            const data = Object.assign({
                created_by: this.props.created_by,
                id: this.props.value ? this.props.value.id : undefined
            }, this.form.json());

            http.post(data.id > 0 ? '/feedback/upd' : '/feedback/add', data).then(res => {
                if (res.code) {
                    throw new Error(res.msg);
                }
                this.setState({ size: 0, });
                this.props.onVisible();
                this.props.onConfirm();
                toast.success(data.id > 0 ? '编辑成功！' : '您的建议与意见提交成功，可以在消息里看到来自系统服务员的回复！');
            }).catch(err => {
                toast.error(err.message);
            });
        } catch (error) {
            toast.error(error.message);
        }
    }
    onCancel = () => {
        this.props.onVisible();
    }
    render() {
        return (
            <Modal title='体验反馈' width={500} visible={this.props.visible} onClose={this.onCancel}>
                <Form onSubmit={this.onSubmit}>
                    <Form.Item model={this.form.fields.title}>
                        <Input model={this.form.fields.title} maxLength={50} />
                    </Form.Item>
                    <Form.Item model={this.form.fields.content}>
                        <Input.Textarea model={this.form.fields.content} onChange={this.onChange} rows={8} />
                        <div style={{ fontSize: 12, margin: '10px 0' }}>
                            您输入了 <Text theme='info'>{this.state.size}</Text> 个字，{
                                this.props.maxLength < this.state.size ? '已经超出 ' : '还可以输入 '}
                            <Text theme='error'>{Math.abs(this.props.maxLength - this.state.size)}</Text> 个字
                        </div>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button>提交</Button>
                        <Button type='button' theme='muted' onClick={this.onCancel}>取消</Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        created_by: state.users.id,
        visible: state.feedback.modalEdit,
        value: state.feedback.editor,
        maxLength: state.feedback.maxLength,
    };
};
const mapDispatchToProps = {
    onVisible: onEditFeedbackModal
};
export default connect(mapStateToProps, mapDispatchToProps)(Editor);