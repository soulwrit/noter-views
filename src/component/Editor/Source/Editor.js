import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import styles from '../index.module.scss';
import { Select, Button, Input, Form, Modal, toast } from '../../lib';
import { setFiles, onVisible } from '../../../reducers/files';
import fs from '../../../utils/fs';

class Editor extends React.Component {
    static defaultProps = {
        types: fs.types,
        type: 2
    }
    static propTypes = {
        created_by: PropTypes.number.isRequired,
        type: PropTypes.number.isRequired,
        types: PropTypes.array,
        value: PropTypes.object
    } 
    getTitle(props) {
        if (fs.isDirectory(props.type)) {
            return !!props.value ? '文件夹信息修改' : '新建文件夹';
        }

        return !!props.value ? '文件信息修改' : '新建文件';
    }
    constructor(props) {
        super();
        this.form = Form.create({
            name: {
                label: '名称',
                placeholder: '请输入资源名称',
                validate(value) {
                    if (!value) {
                        return '请填写资源名称';
                    }
                    if (value.length > 20 || value.length <= 0) {
                        return '资源名称不能超过20个字符长度';
                    }
                }
            },
            intro: {
                label: '说明',
                placeholder: '请提取资源说明',
                validate(value) {
                    if (!value) {
                        return '请输入说明内容';
                    }
                    if (value.length > 100) {
                        return '说明内容应在100个文字以内';
                    }
                }
            },
            content: {
                default: '',
                required: false
            },
            type: {
                label: '类型',
                default: props.type,
                validate(value) {
                    if (!value) {
                        return '请选择文件类型';
                    }
                }
            }
        }, props.value);
    }
    onSubmit = () => {
        const { props, form } = this;
        const file = Object.assign({
            pid: this.props.pid,
            created_by: this.props.created_by,
        }, !!props.value ? { id: props.value.id, ...form.json() } : form.json());

        this.props.setFiles(!props.value, file).then(() => {
            this.props.onVisible();
            toast.success(`${this.getTitle(props)} 成功!`);
        });
    }
    render() {
        const { form, props } = this;
        const { fields } = form;

        
        return (
            <Modal
                title={this.getTitle(props)}
                visible={props.visible}
                onClose={props.onVisible}
                footer={
                    <>
                        <Button value='确定' onClick={this.onSubmit} />
                        <Button value='取消' onClick={props.onVisible} theme='muted' />
                    </>
                }>
                <Form>
                    <Form.Item required model={fields.type} show={!fs.isDirectory(props.type)}>
                        <Select model={fields.type}>
                            {props.types.map((item, index) => (
                                <Select.Option value={item.id} key={index}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item required model={fields.name}>
                        <Input model={fields.name} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item required model={fields.intro}>
                        <Input.Textarea model={fields.intro} style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}
const mapStateToProps = ({ files, users }, props) => {
    return {
        created_by: props.created_by || users.id,
        type: props.type || files.createdType,
        visible: files.visible,
    }
}
const mapDispathToProps = {
    onVisible, setFiles
}
export default connect(mapStateToProps, mapDispathToProps)(Editor)