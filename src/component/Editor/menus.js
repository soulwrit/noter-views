import React from 'react';
import { Icon } from '@writ/react';
import styles from './index.module.scss';
export default [
    {
        icon: <Icon className={styles.menuIcon} type='form' />,
        key: 'form',
        Menu: React.lazy(() => import('./Module/FileTree')),
    },
    {
        icon: <Icon className={styles.menuIcon} type='search' />,
        key: 'search',
        Menu: React.lazy(() => import('./Module/FileSearch')),
    },
];