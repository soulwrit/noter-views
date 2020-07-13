import React, { useState } from 'react';
import { toast, Button } from '@writ/react';

export const ExampleToast = () => {
    // const [message, setMessage] = useState('我是一条信息');
    const onUpdateNotity = () => {
        toast.success('我是一条信息', {
            key: 'message'
        });
        // setTimeout(function(){
        //     setMessage('我是一条新的消息');
        // }, 1000);
    };

    return (
        <div>
            <p>
                <Button onClick={onUpdateNotity}>定时消息</Button>
            </p>
            <Button onClick={() => { toast.error('我在顶部开始的位置', 'top-start'); }}>top-start</Button>
            <Button onClick={() => { toast.error('我在顶部', 'top'); }}>top</Button>
            <Button onClick={() => { toast.error('我在顶部结束的位置', 'top-end'); }}>top-end</Button>
            <Button onClick={() => { toast.error('我在底部开始的位置', 'bottom-start'); }}>bottom-start</Button>
            <Button onClick={() => { toast.error('我在底部', 'bottom'); }}>bottom</Button>
            <Button onClick={() => { toast.error('我在底部结束的位置', 'bottom-end'); }}>bottom-end</Button>
        </div>
    )
}