import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, toast, Tag, Icon } from '@writ/react';

export function ExampleForm() {
    const [loginData, setLoginData] = useState();
    const form = Form.create({
        username: {
            label: '用户',
            placehodler: '请输入用户名',
            required: true,
            default: 'root'
        },
        password: {
            label: '密码',
            placehodler: '请输入密码',
            required: true
        },
        keeplive: {
            label: '',
        }
    });
    const { fields } = form;
    const onSubmitLogin = () => {
        try {
            const data = form.json();
            setLoginData(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Form style={{ width: 320 }} onSubmit={onSubmitLogin}>
                <h2>用户登录</h2>
                <Form.Item model={fields.username}>
                    <Input type='text' model={fields.username} />
                </Form.Item>
                <Form.Item model={fields.password}>
                    <Input type='password' model={fields.password} />
                </Form.Item>
                <Form.Item model={fields.keeplive} className='tar'>
                    <Checkbox value='记住密码' model={fields.keeplive} /> <Button value='登录' />
                </Form.Item>
            </Form>
            {loginData ? <>
                <p>输入的用户名: {loginData.username}</p>
                <p>输入的密码: {loginData.password}</p>
            </> : null}

            <p>
                <Input width='auto' suffix={<Button value='提交' />} />
            </p>
            <p>
                <Input width='auto' prefix={<Tag theme='dark' value={<Icon type='search' size='1x' />} />} />
            </p>
            <p>
                <Input width='auto' prefix={<Tag theme='error' value={<Icon type='search' size='1x' />} />} />
            </p>
            <p>
                <Input width='auto' suffix={<Tag theme='error' value={<Icon type='search' size='1x' />} />} />
            </p>
        </>
    )
}
