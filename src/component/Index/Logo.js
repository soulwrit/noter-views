import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ReactComponent as SVGLogo } from './logo.svg';
export const Logo = props => {
    const { className, color, size, style } = props;
    const svgElement = React.createElement(SVGLogo, {
        className: classnames('svgico x1', className),
        style: Object.assign({
            color: color,
            fontSize: size
        }, style)
    });

    return svgElement;
}

Logo.defaultProps = {
    color: '#fff'
};
if (window.DEV) {
    Logo.propTypes = {
        color: PropTypes.string,
        href: PropTypes.string,
        size: PropTypes.string, 
    };
}
