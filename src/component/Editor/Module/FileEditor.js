import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Confirm, Form, Input, Select, toast } from '@writ/react';
import fs from '../fs';
import { setFiles } from '../reducers/file';
import { closeFileEditor } from '../reducers/fileEditor';

const getTitle = (type, isModified) => {
    if (fs.isDirectory(type)) {
        return isModified ? '修改文件夹信息' : '新建文件夹';
    }

    return isModified ? '修改文件信息' : '新建文件';
};
const FileEditor = props => {
    const { created_by, form, onClose, pid, setFiles, type, types, value, visible } = props;
    const { fields } = form;
    const isModified = !!value;
    const title = getTitle(type, value);
    const onSubmit = () => {
        try {
            const parentId = isModified ? fs.getPid(value) : pid;
            const data = form.json();
            const file = Object.assign({ created_by, pid: parentId, }, isModified ? { id: value.id, ...data } : data);

            setFiles(!value, file).then(() => {
                onClose();
                toast.success(title + '，操作成功!');
            });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Confirm onClose={onClose} onConfirm={onSubmit} title={title} visible={visible}>
            <Form>
                <Form.Item required model={fields.type} show={!fs.isDirectory(type)}>
                    <Select model={fields.type}>
                        {types.map((item, index) => (
                            <Select.Option value={item.id} label={item.name} key={index} />
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item required model={fields.name}>
                    <Input model={fields.name} />
                </Form.Item>
                <Form.Item required model={fields.intro}>
                    <Input.Textarea model={fields.intro} />
                </Form.Item>
            </Form>
        </Confirm>
    );
};
FileEditor.defaultProps = {
    created_by: void 0,
    pid: void 0,
    types: fs.types,
    type: void 0,
    value: null,
};
if (window.DEV) {
    FileEditor.propTypes = {
        created_by: PropTypes.number.isRequired,
        pid: PropTypes.any,
        type: PropTypes.number.isRequired,
        types: PropTypes.array,
        value: PropTypes.object,
    };
}
const mapStateToProps = ({ files, users }) => {
    return {
        created_by: users.id,
        form: Form.create({
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
                default: void 0,
                required: false
            },
            type: {
                label: '类型',
                default: files.editor.type,
                validate(value) {
                    if (!value) {
                        return '请选择资源类型';
                    }
                }
            }
        }, files.editor.value),
        pid: files.editor.pid,
        type: files.editor.type,
        value: files.editor.value,
        visible: files.editor.visible,
    }
};
const mapDispathToProps = {
    onClose: closeFileEditor,
    setFiles
};
export default connect(mapStateToProps, mapDispathToProps)(FileEditor);