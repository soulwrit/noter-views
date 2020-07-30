import React, { useRef, } from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, Scrollor, List } from '@writ/react';
import styles from '../index.module.scss';
export const CTXMenu = props => {
    const { filter, onHandle } = props;
    const root = useRef();
    const relatedRef = useRef();
    const onTarget = e => {
        /**
         * 在右键菜单打开的时候, 确认菜单定位点的目标, 根据不同的目标响应不同的菜单内容
         */
        const element = root.current;
        let target = e.target;
        let related;

        while (true) {
            if (target === element) break;
            if (related == null) break;
            related = target.getAttribute('data-tid');
            target = target.parentElement;
        }
 
        relatedRef.current = related;
        filter(related, values);
    };
    const { children, title, values } = props;

    return (
        <ContextMenu onTarget={onTarget}>
            <ContextMenu.List>
                <List>
                    <List.Head>{title}</List.Head>
                    {values.map(menu => (
                        <List.Item className={styles.ctxMenuItem} key={menu.key} onClick={() => onHandle(menu.key, relatedRef.current)}>{menu.children}</List.Item>
                    ))}
                </List>
            </ContextMenu.List>
            <ContextMenu.Area>
                <Scrollor viewRef={root}>{children}</Scrollor>
            </ContextMenu.Area>
        </ContextMenu>
    );
};
CTXMenu.defaultProps = {
    filter: () => { },
    onHandle: () => { },
    title: '右键菜单',
    values: [],
};
if (window.DEV) {
    CTXMenu.propTypes = {
        filter: PropTypes.func,
        onHandle: PropTypes.func,
        title: PropTypes.any,
        values: PropTypes.arrayOf(PropTypes.shape({
            children: PropTypes.any,
            key: PropTypes.string
        })),
    };
}