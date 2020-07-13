import React from 'react';
import { Menu, ToolBar } from '@writ/react';

export const ExampleMenu = () => {

    return (
        <>
            <Menu index={1}>
                <Menu.Item>百度</Menu.Item>
                <Menu.Item>腾讯</Menu.Item>
                <Menu.Item>阿里</Menu.Item>
                <Menu.Item disabled>谷歌</Menu.Item>
                <Menu.Item>电信</Menu.Item>
            </Menu>
            <p></p>
            <div style={{ width: 50, height: 160 }}>
                <Menu dir='ttr' index={2}>
                    <Menu.Item>百度</Menu.Item>
                    <Menu.Item>腾讯</Menu.Item>
                    <Menu.Item>阿里</Menu.Item>
                    <Menu.Item>谷歌</Menu.Item>
                    <Menu.Item>电信</Menu.Item>
                </Menu>
            </div>
            <ToolBar>  props </ToolBar>
        </>
    );
}
