import './index.scss'
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { assets } from './assets';

class Emoji extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: props.assets,
            visible: true
        };
    }
    componentDidMount() {
        document.addEventListener('click', this.onHidden, false);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.onHidden);
    }
    onHidden = e => {
        let node = e.target || e.srcElement;;

        while (node) {
            if (node === this.element) {
                return;
            }
            node = node.parentElement;
        }
        this.setState({
            visible: false
        });
    }
    onClick(e, src, alt) {
        e.stopPropagation();
        const img = new Image();
        img.src = src;
        img.alt = alt;
        img.style.cssText = 'max-width:40px;';
        // 选中表情时 
        this.props.onSelect(img.outerHTML);
        this.setState({ visible: false });
    }
    render() {
        const { assets, visible } = this.state;

        return [
            React.createElement('span', {
                className: 'emoji-icon',
                key: 0,
                children: '表情',
                onClick: e => {
                    e.stopPropagation();
                    if (e.nativeEvent) {
                        e.nativeEvent.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                    }
                    this.setState({
                        visible: !this.state.visible
                    });
                }
            }),
            visible ? React.createElement('div', {
                key: 1,
                className: 'emoji-wrap',
                children: React.createElement('div', {
                    className: 'emoji-scroll',
                    children: assets.map((emoji, key) => {
                        return React.createElement('div', {
                            key,
                            className: 'emoji-item',
                            children: React.createElement('img', {
                                src: emoji.src,
                                alt: emoji.alt,
                            }),
                            onClick: e => {
                                this.onClick(e, emoji.src, emoji.alt);
                            }
                        });
                    })
                }),
                ref: ele => {
                    this.element = ele;
                }
            }) : null
        ]
    }
};

Emoji.defaultProps = {
    onSelect: function () { },
    assets
};
if (true) {
    Emoji.propTypes = {
        onSelect: PropTypes.func,
        assets: PropTypes.arrayOf(PropTypes.shape({
            src: PropTypes.string.isRequired,
            alt: PropTypes.string
        }))
    };
}
export default {
    disabled: false,
    visible: true,
    type: 'innerHTML',
    trigger: 'click',
    render() {
        return React.createElement(Emoji, {

        })
    },
}