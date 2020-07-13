import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './emoji.scss'
import emojiSource from './emoji-source';
import { noop } from './utils';

const css = {
    box: {
        width: 44,
        height: 44,
        textAlign: 'center',
        lineHeight: '44px'
    },
    img: {
        maxWidth: 32
    }
};
export default class Emoji extends React.Component {
    constructor(props) {
        super(props);
        this.document = document;
        this.identifer = {
            box: 'box',
            tab: 'tab-',
            emo: 'emo'
        };
        this.emojiTag = 'img';
        this.state = {
            tabActiveKey: 0,
            dataset: [...emojiSource, ...emojiSource, ...emojiSource]
        };
        this.document.addEventListener('click', this.onDocumentClick, false);
    }

    onDocumentClick = evt => {
        const target = evt.target || evt.srcElement;
        let identifer, node = target;

        while (node) {
            identifer = node.dataset.identifer;
            if (identifer) {
                break;
            }
            node = node.parentElement;
        }

        if (!identifer) {
            this.document.removeEventListener('click', this.onDocumentClick);
            return this.props.onCancel(evt);
        }

        if (identifer === this.identifer.emo) {
            const isEmoji = String(target.tagName || target.nodeName).toLowerCase() === this.emojiTag;
            if (isEmoji) {
                return this.props.onSelect(target.outerHTML); // 选中表情时
            }
            return;
        }

        return this.tabSwitch(identifer, evt);
    }

    tabSwitch(identifer) {
        const ids = identifer.split('-');
        if (ids[1]) {
            this.setState({
                tabActiveKey: Number(ids[1])
            });
        }
    }

    render() {
        const { tabActiveKey, dataset } = this.state;
        let isActive;

        return (
            <div className={classnames(styles.warpper)} data-identifer={this.identifer.box}>
                {/* 表情选项卡 */}
                <div className={styles.tabList}>
                    {
                        dataset.map((emoji, key) => {
                            isActive = tabActiveKey === key;
                            const active = { [styles.activeBar]: isActive };

                            return (
                                <div className={classnames(styles.tabBar, active)} data-identifer={this.identifer.tab + key} key={'tab' + key} title={emoji.title}>
                                    <img src={emoji.cover} />
                                </div>
                            );
                        })
                    }
                </div>

                {/* 表情内容*/}
                <div className={styles.tabWarp} data-identifer={this.identifer.emo}>
                    {
                        dataset.map((emoji, key) => {
                            isActive = tabActiveKey === key;
                            const active = { [styles.activeBox]: isActive };

                            return (
                                <div className={classnames(styles.tabBox, active)} key={key}>
                                    {isActive && emoji.body.map((item, idx) => {

                                        return (
                                            <div className={styles.emoji} key={idx} style={css.box}><img src={item.src} style={css.img} alt='emoji image' /></div>
                                        );
                                    })}
                                </div>
                            );
                        })
                    }
                </div>

                {this.props.children}
            </div>
        )
    }
};

Emoji.propTypes = {
    visible: PropTypes.bool,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func
};

Emoji.defaultProps = {
    visible: false,
    onSelect: noop,
    onCancel: noop
};
