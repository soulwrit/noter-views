import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Modal, Input, Button, Checkbox, toast } from '../../lib';
import { http } from '@writ/utils/request-fetch';

class Editor extends React.PureComponent {
    constructor(props) {
        super();
        this.form = Form.create(props.model, props.value);
    }
    onSubmit = () => {
        try {
            const data = Object.assign({}, this.props.value, this.form.json());

            data.gid = this.props.gid;
            data.created_by = this.props.created_by;

            http.post(data.id ? '/grpn/upd' : '/grpn/add', data).then(res => {
                if (res.code) {
                    throw new Error(res.msg);
                }
                this.props.onConfirm();
                this.props.onCancel();
                toast.success(data.id > 0 ? '群组公告修改成功！' : '公告发表成功！');
            }).catch(error => {
                toast.error(error.message);
            });
        } catch (error) {
            toast.error(error.message);
        }
    }
    render() {
        const { visible, onCancel } = this.props;
        const { fields } = this.form;

        return (
            <Modal visible={visible} width={500} height={400}
                onClose={onCancel}
                footer={
                    <>
                        <Button value='发布' onClick={this.onSubmit} />
                        <Button theme='muted' value='取消' onClick={onCancel} />
                    </>
                }>
                <Form>
                    <Form.Item>
                        <Button theme='muted' value='表情' type='button' />
                        <Button theme='muted' value='图片' type='button' />
                    </Form.Item>
                    <Form.Item model={fields.content}>
                        <Input.Textarea model={fields.content} rows={15} />
                    </Form.Item>
                    <Form.Item model={fields.top}>
                        <Checkbox model={fields.top} name='isTop' checked value='置顶' />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
Editor.defaultProps = {
    model: {
        content: {
            required: true,
            placeholder: '请输入公告内容',
            validate(value) {
                if (!value) {
                    return '请输入公告内容';
                }
            },
        },
        top: {
            default: undefined
        }
    }
};
if (window.DEV) {
    Editor.propTypes = {
        gid: PropTypes.number.isRequired,
        onCancel: PropTypes.func.isRequired,
        onConfirm: PropTypes.func.isRequired,
        value: PropTypes.object,
    };
}
export default connect(null, { onSent: function () { } })(Editor);