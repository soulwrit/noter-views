import React, { useState } from 'react';
import { Mask, Button } from '@writ/react';

export const ExampleMask = () => {
    const [visible, setVisible] = useState(false);
    const [isGloabl, setIsGloabl] = useState(false);

    return (
        <>
            <p>我就是一段文字,但是我被遮住了</p>
            <p><Button onClick={() => setVisible(!visible)}>点我遮住页面</Button></p>
            <p><Button onClick={() => setIsGloabl(!isGloabl)}>{isGloabl? '退出全局': '设为全局'}</Button></p>
            <Mask visible={visible} global={isGloabl} onClose={() => setVisible(!visible)}></Mask>
        </>
    );
}

