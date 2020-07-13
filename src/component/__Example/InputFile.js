import React, { useState, useEffect } from 'react';
import getPathById from '@writ/utils/get-path-by-id';
import raf from '@writ/utils/raf';
import imageCutter from '@writ/utils/img-cutter';
import { Text, InputFile, Button, IconUpload, Modal, toast, Select, Checkbox, Table } from '../lib';

const host = 'http://127.0.0.1:9004';
function imagePath(file) {
    return file.path.id ? (host + '/upload/' + getPathById(file.path.id) + file.ext) : file.path;
}

export function ExampleInputFile() {
    const [visible, setVisible] = useState();
    const [dataURL, setDataURL] = useState();
    const [readonly, setReadonly] = useState();
    const [multiple, setMultiple] = useState();
    const [directory, setDirectory] = useState();
    const [icon, setIcon] = useState();
    const [type, setType] = useState('list');

    const upload = {
        action: host + '/upload/set',
        body(file, props) {
            const formData = new FormData();

            formData.append('uid', 1);
            formData.append(props.name, file.path);

            if (file.path.id) {
                // 重新上传
                formData.append('id', file.path.id);
            }

            return formData;
        },
        onOK(res) {
            if (typeof res !== 'object' || !res) {
                throw new Error(res || 'Server Error.');
            }

            if (res.code > 0) {
                throw new Error(res.msg);
            }

            return res.data[0] || {};
        }
    };
    const download = {
        action: host + '/upload/get',
        body(file) {
            return {
                id: file.path.id
            };
        },
        dataType: 'blob',
        onOK(blob, file) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(blob);

            a.href = url;  // 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
            a.download = file.name;
            a.click();
            raf(() => {
                window.URL.revokeObjectURL(url);
            });

            return true;
        },
    };
    const remove = {
        action: host + '/upload/del',
        body(file) {
            return {
                ext: file.ext || file.path.ext,
                id: file.path.id,
                uid: 1,
            };
        },
    };
    const preview = file => {
        const src = imagePath(file);

        imageCutter(src, 100).then((thumb) => {
            setDataURL({
                imgURL: src instanceof File ? window.URL.createObjectURL(src) : src,
                thumb
            });
        }).catch(() => {
            toast.error('404 Not Found');
        });
    };

    const types = ['list', 'dragbox', 'picture'];
    const initialValue = [
        { ext: '.jpg', name: '小仙女', id: 7 },
    ];

    useEffect(() => {
        if (dataURL) {
            setVisible(true);
        }
    }, [dataURL]);

    return (
        <>
            <Table
                columns={[
                    { key: 'oa', value: '参数设置' },
                    { key: 'op', value: '参数操作' },
                ]}
                source={[
                    {
                        oa: '是否只读',
                        op: <Checkbox name='readonly' value={readonly ? '只读' : '编辑'} onChange={() => setReadonly(!readonly)} />
                    },
                    {
                        oa: '视图类型',
                        op: <Select onChange={e => setType(e[0].value)}>{types.map((value, index) => <Select.Option value={value} key={index} />)}</Select>
                    },
                    {
                        oa: '是否可多选文件',
                        op: <Checkbox name='multiple' onChange={() => setMultiple(!multiple)} />
                    },
                    {
                        oa: '是否可上传文件夹',
                        op: <Checkbox name='directory' onChange={() => setDirectory(!directory)} />
                    },
                    {
                        oa: '是否用图标代替文本按钮',
                        op: <Checkbox name='icon' onChange={() => setIcon(!icon)} />
                    },
                ]}
            >
                <Table.Column></Table.Column>
                <Table.Column></Table.Column>
            </Table>

            <InputFile
                upload={upload}
                download={download}
                directory={directory}
                remove={remove}
                preview={preview}
                getPath={imagePath}
                message={<Text type='p' value='上传的文件不超过 xxx B' theme='muted' />}
                multiple={multiple}
                readonly={readonly}
                value={initialValue}
                type={type}
                icon={icon}
                style={{ marginTop: 15 }}
            >
                <Button theme='muted'>
                    <IconUpload /> 选择文件
                </Button>
            </InputFile>
            <Modal visible={visible} title='图片预览' onClose={() => setVisible(false)} width={600}>
                {dataURL ? <img src={dataURL.thumb} /> : null}
                {dataURL ? <img src={dataURL.imgURL} /> : null}
            </Modal>
        </>
    );
}