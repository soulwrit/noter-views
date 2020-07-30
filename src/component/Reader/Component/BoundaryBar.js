import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from '@writ/utils/noop';
import { Icon } from '@writ/react';
import styles from './BoundaryBar.module.scss';

const getPosition = position => {
    switch (position) {
        case 'right':
            return styles.posRight;
        case 'top':
        default: return styles.posTop;
    }
};
const BoundaryBar = memo(function ReaderLayout(props) {
    const { onAction, icon, none, position } = props;

    return (
        <div className={classnames(styles.boundaryBarTrack, getPosition(position))}>
            <div className={classnames(styles.boundaryBarTool, {
                non: none
            })} onClick={onAction}>
                <Icon type={icon} size='2x' />
            </div>
        </div>
    );
});
BoundaryBar.defaultProps = {
    icon: 'unfold',
    position: 'top',
    none: false,
    onAction: noop
};
if (window.DEV) {
    BoundaryBar.propTypes = {
        icon: PropTypes.string,
        onAction: PropTypes.func,
        none: PropTypes.bool,
        position: PropTypes.string
    };
}
export { BoundaryBar };