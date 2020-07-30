import React from 'react';
import { Icon, } from '@writ/react';
import defAvatar from '../User/avatar.jpg';

export const views = [
    {
        key: 'my',
        title: '我的笔记',
        radius: 10,
        cover: defAvatar,
        icon: void 0,
        component: React.lazy(() => import('./Module/MyFiles')),
    },
    {
        key: 'search',
        title: '笔记查找',
        radius: void 0,
        cover: void 0,
        icon: <Icon type='search' size='3x' />,
        component: React.lazy(() => import('./Module/FileSearcher')),
    },
];

/**
 * 四种视图
 * 1. 我的笔记 -> 我的笔记列表
 * 2. 笔记查找 -> 笔记检索，在本站查找
 * 3. 团队笔记 -> 团队笔记列表，可查看团队内其他成员的笔记
 * 4. 笔记详情 -> 以上三种页面都可进入笔记详情页
 */
