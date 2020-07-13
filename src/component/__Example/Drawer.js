import React, { useState } from 'react';
import { Drawer, Button, List, Radio } from '@writ/react';
import forThrough from '@writ/utils/for-through';

export const ExampleDrawer = () => {
    const [visible, setVisible] = useState(false);
    const [placement, setPlacement] = useState('left');
    const onToggle = () => setVisible(!visible);
    const placements = ['top', 'right', 'bottom', 'left'];

    return (
        <>
            <List>
                <List.Head><Button onClick={onToggle}>{visible? '合上抽屉':'拉开抽屉'}</Button></List.Head>
                <List.Item>
                    <Radio.Group active={3} name='placement' onChange={index => setPlacement(placements[index])}>
                        {placements.map(value => (
                            <Radio key={value}>{value}</Radio>
                        ))}
                    </Radio.Group>
                </List.Item>
            </List>
            <Drawer visible={visible} onClose={onToggle} placement={placement}>
                <List>
                    <List.Head>我是列表</List.Head>
                    {forThrough(1, 100, value => (
                        <List.Item key={value}>列表项目 {value}</List.Item>
                    ))}
                </List>
            </Drawer>
        </>
    );
}

