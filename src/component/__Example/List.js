import React from 'react';
import { List } from '@writ/react';

export const ExampleList = () => {
    return (
        <>
            <List>
                <List.Head>HOOKS (提案)</List.Head>
                <List.Item>1. 介绍 Hooks(Introducing Hooks)</List.Item>
                <List.Item>2. Hooks 概述 (Hooks at a Glance)</List.Item>
                <List.Item>3. 使用 State(状态) Hook</List.Item>
                <List.Item>4. 使用 Effect Hook</List.Item>
            </List>
        </>
    )
}
