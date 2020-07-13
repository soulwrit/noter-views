import React from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';
export * from '@writ/react';
export function Placeholder(props) {
    return React.createElement('div', {
        className: classnames(styles.placeholder, props.className),
        style: props.style
    }, props.value || props.children || '没有数据哦');
}