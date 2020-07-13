import React from 'react';
import { ContextMenu, List } from '../lib';

export function ExampleContextMenu() {
    const list = [
        {
            value: 'copy file',
            key: 'copy',
            handle() {
                alert('I am Copy Action.');
            }
        },
        {
            value: 'edit file',
            key: 'edit',
            handle() {
                alert('I am Edit Action.');
            }
        }
    ];
    const onSelect = e => {
        const target = e.target;
        if (!target) return;
        // 事件代理
        const index = target.getAttribute('data-index');
        const action = list[index];

        if (action && action.handle) {
            action.handle();
        }
        return true;
    };
    const onOpen = () => {
        console.log('Menu Opened.');
    };
    const onClose = () => {
        console.log('Menu Closed.');
    };

    return (
        <ContextMenu onSelect={onSelect} onOpen={onOpen} onClose={onClose}>
            <ContextMenu.List>
                <List>
                    <List.Head>ContextMenu Demo</List.Head>
                    {list.map((item, i) => <List.Item key={item.key} data-index={i}>{item.value}</List.Item>)}
                </List>
            </ContextMenu.List>
            <ContextMenu.Area>
                <div style={{ width: 500, height: 500, border: '1px solid #ddd', position: 'relative' }}>
                    右键菜单区
                    </div>
            </ContextMenu.Area>
        </ContextMenu>
    );
}