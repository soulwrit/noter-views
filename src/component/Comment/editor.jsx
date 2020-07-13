import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from 'antd';

import styles from './editor.scss';
import Emoji from './emoji';
import Voice from './voice';
import Textarea from './textarea';
import { emitter, EVENTS } from './utils';

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null, // 内容
            size: 0, // 内容的长度
            diffSize: 0, // 内容长度与规格长度的差值
            isEmpty: true, // 是否没有内容

            emojiVisible: false, // 表情包的显隐
            voiceVisible: false // 语音评论的显隐
        };
    }

    // 提交
    onSubmit = () => {
        this.props.onSubmit(this.state.value);
    }
    // 编辑区内容发生变化
    onValueChange = (value, size, diffSize, isEmpty) => {
        this.setState({ size, diffSize, isEmpty, value });
        this.props.onChange(value)
    };

    // 编辑区被清空时
    onValueEmpty = (isEmpty, o, size) => {
        this.setState({ isEmpty, size });
    };

    // 插入语音
    onVoiceOpen = () => {
        this.setState({ voiceVisible: true });
    };
    onVoiceClose = () => {
        this.setState({ voiceVisible: false });
    };
    onVoiceRecord = () => { };

    // ---------- 插入表情
    onEmojiOpen = () => {
        emitter.emit(EVENTS.TEXTAREA_INSERT_CURSOR);
        this.setState({ emojiVisible: true });
    };
    onEmojiClose = () => {
        this.setState({ emojiVisible: false });
    };
    onEmojiSelect = (emoji) => {
        emitter.emit(EVENTS.TEXTAREA_INSERT_CONTENT, emoji);
    };
    render() {
        const { placeholder, size, theme, className, index, maxSize } = this.props;
        const isOk = this.state.diffSize > 0;
        const hasText = this.state.size > 0;

        return (
            <div className='cmt-ipt'>
                <div className={classnames(styles.warpper, className, styles[theme], styles[size + 'Size'])}>
                    <div className={styles.placeholder}>{this.state.isEmpty ? placeholder : null}</div>
                    <Textarea onChange={this.onValueChange} onEmpty={this.onValueEmpty} maxSize={maxSize} index={index} />
                </div>
                <div className='cmt-btn'>
                    <div className='cmt-emoji'>
                        <span className='emoji-ico' onClick={this.onEmojiOpen}>
                            <Icon type='smile' />
                        </span>
                        <span className='voice-ico' onClick={this.onVoiceOpen}>
                            <Icon type='sound' />
                        </span>
                    </div>
                    <div className='cmt-submit'>
                        {hasText ?
                            isOk > 0 ?
                                <span className='cmt-num'>还可以输入{this.state.diffSize}个字</span> :
                                <span className='cmt-red'>已经超出{Math.abs(this.state.diffSize)}个字</span> :
                            null}
                        <button onClick={this.onSubmit} className={classnames(styles.btn, styles[theme + 'Btn'])} disabled={!hasText || !isOk}>发布</button>
                    </div>
                </div>
                {this.state.emojiVisible && <Emoji onSelect={this.onEmojiSelect} onCancel={this.onEmojiClose} />}
                {this.state.voiceVisible && <Voice onRecord={this.onVoiceRecord} onCancel={this.onVoiceClose} />}
                {this.props.children}
            </div>
        )
    }
};

Editor.propTypes = {
    placeholder: PropTypes.string,
    theme: PropTypes.oneOf([
        'default',
        'primary',
        'danger',
        'warning'
    ]),
    size: PropTypes.oneOf([
        'default', 'small', 'large'
    ]),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    index: PropTypes.number,
    maxSize: PropTypes.number
};

Editor.defaultProps = {
    placeholder: '请在此输入',
    theme: 'primary',
    size: 'default',
    onChange: services.noop,
    onSubmit: services.noop,
    index: 0,
    maxSize: 500
};

