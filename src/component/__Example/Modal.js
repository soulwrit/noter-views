import React, { useState } from 'react';
import { Modal, Button, Grid, List, Text, alert, confirm, prompt } from '@writ/react';
const placements = [
    'top-start', 'top', 'top-end',
    'left', 'middle', 'right',
    'bottom-start', 'bottom', 'bottom-end',
];
const getGridClassName = function (index) {
    let className;
    switch (index) {
        case 1:
        case 6:
        case 7:
            className = 'tar';
            break;
        case 2:
        case 5:
        case 8:
            className = 'tac';
            break;
        case 3:
        case 4:
        case 9:
            className = 'tal';
            break;
        default: break;
    }
    return className;
};
const longText = '天使（angel）这个词源于希腊语“angelos”，意为使者。在基督教，穆斯林，犹太教和其他一些神学中，天使常扮演着使者，随从，神的代理的角色。本指上天的使者，在其它不少宗教中也有类似概念，并中译为“天使”。在圣经中，神的意志通常是由天使传达的。天使是纯精神体，拥有出众的智力和巨大的力量，而且非常的神圣。';
export const ExampleModal = () => {
    const [visible, setVisible] = useState(false);
    const [placement, setPlacement] = useState('fade');
    const onClose = () => setVisible(!visible);
    const [status, setStatus] = useState(0);
    const statuses = ['关闭的', '开始打开', '已经打开', '开始关闭', '已关闭'];

    const onOpenAlert = () => {
        alert(longText);
    };
    const onOpenConfirm = () => {
        confirm(longText).then(value => {
            window.alert('你选择了： ' + ({
                [true]: '确定',
                [false]: '取消'
            }[value]));
        });
    };
    const onOpenPrompt = () => {
        prompt(longText).then(value => {
            window.alert('你输入了： ' + value);
        });
    };

    return (
        <>
            <p>
                <Button onClick={onOpenAlert}>模拟 window.alert</Button>
                <Button onClick={onOpenConfirm}>模式 window.confirm</Button>
                <Button onClick={onOpenPrompt}>模拟 window.prompt</Button>
            </p>
            <p>
                <Button onClick={onClose}>通用的</Button>
                <Button onClick={() => { onClose(); setPlacement('fade'); }}>淡入淡出</Button>
            </p>
            <p>模态框的操作状态： <Text value={statuses[status]} theme='error' /></p>
            <Modal
                onClose={onClose}
                visible={visible} title='我是一个模态框，这是我的标题'
                placement={placement}
                onShow={() => {
                    setStatus(1)
                    console.log('modal onShow');
                }}
                onHide={() => {
                    setStatus(3)
                    console.log('modal onHide');
                }}
                onShown={() => {
                    setStatus(2)
                    console.log('modal onShown');
                }}
                onHidden={() => {
                    setStatus(4)
                    console.log('modal onHidden');
                }}
            >
                <List>
                    <List.Head>关于我的信息 </List.Head>
                    <List.Item>我的默认宽度是：300px </List.Item>
                    <List.Item>我当前的状态是：{{ true: '已打开', false: '已关闭' }[visible]}</List.Item>
                    <List.Item>我当前的位置是：{placement}</List.Item>
                </List>

            </Modal>
            <Grid cell={10} style={{ height: 240, width: 600, margin: '50px auto' }} >{
                placements.map((value, index) => (
                    <Grid key={index} span={3} className={getGridClassName(index + 1)}>
                        <Button onClick={() => {
                            setPlacement(value);
                            onClose();
                        }}>{value}</Button>
                    </Grid>
                ))
            }</Grid>
        </>
    );
}
