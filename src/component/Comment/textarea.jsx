import React from 'react';
import PropTypes from 'prop-types';
import styles from './editor.scss';
import { emitter, EVENTS, toHTMLNode, toTextNode, noop, emptyObject, cursor } from './utils';

export default class Textarea extends React.Component {
    constructor(props) {
        super(props);

        this.size = 0;// 编辑区文本的长度
        this.value = ''; // 编辑区的内容
        this.isEmpty = true; // 编辑区是否为空

        this.selection = window.getSelection();
        this.range = document.createRange();
        this.startOffset = 0;
        this.endOffset = 0;
        this.cursorPosition = 0;
        this.inserted = false;
        this.htmlRegex = /<[a-z][\s\S]*>/i;// 是否为html标记

        emitter.on(EVENTS.TEXTAREA_INSERT_CONTENT, this.insertContent);
        emitter.on(EVENTS.TEXTAREA_INSERT_CURSOR, this.insertCursor);
        emitter.on(EVENTS.TEXTAREA_CLEAN, this.clean);
    };

    getTextarea() {
        return this.refs['textarea' + this.props.index];
    }
    clean = () => {
        this.getTextarea().innerHTML = '';
        this.size = 0;// 编辑区文本的长度
        this.value = ''; // 编辑区的内容
        this.isEmpty = true; // 编辑区是否为空

        this.startOffset = 0;
        this.endOffset = 0;
        this.cursorPosition = 0;
        this.inserted = false;
        this.onEmpty(true);
    }

    // 输入域插入光标
    insertCursor = () => {
        const textarea = this.getTextarea();
        const { range, selection } = this;

        range.setStart(textarea, this.startOffset);
        range.setEnd(textarea, this.endOffset);
        selection.removeAllRanges();
        selection.addRange(range);
        this.onEmpty(true);
    };

    // 插入内容
    insertContent = (content) => {
        const textarea = this.getTextarea();
        const { selection, range, htmlRegex } = this;
        let contentNode, contentLength;

        if (htmlRegex.test(content)) {
            contentNode = toHTMLNode(content);
            contentLength = 1;
        } else {
            contentNode = toTextNode(content);
            contentLength = content.length;
        }

        // if (textarea.childNodes.length > 0) {
        //     for (var i = 0; i < textarea.childNodes.length; i++) {
        //         if (i == selection.anchorOffset) {
        //             textarea.insertBefore(contentNode, textarea.childNodes[i])
        //         }
        //     }
        // } else {
        //     textarea.appendChild(contentNode)
        // }

        range.insertNode(contentNode);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);

        this.startOffset = range.startOffset;
        this.endOffset = range.endOffset;
        this.size += contentLength;
        this.inserted = true;
    }
    onEmpty = (isEmpty, evt) => {
        this.isEmpty = isEmpty;
        this.props.onEmpty(this.isEmpty, evt || emptyObject, this.size);
    };
    onClick = evt => {
        this.isEmpty && this.onEmpty(false, evt);
        const textarea = this.getTextarea();
        this.cursorPosition = cursor.getPosition(textarea);
    };
    onBlur = evt => {
        this.size === 0 && this.onEmpty(true, evt);
    };
    onInput = (evt) => {
        const target = this.getTextarea();
        const length = target.childNodes.length;

        this.value = target.innerHTML;
        this.size = length + target.innerText.length;
        this.cursorPosition = cursor.getPosition(target);
        this.props.onChange(target.innerHTML, this.size, this.props.maxSize - this.size, this.isEmpty);
    };

    render() {
        const { resize, disabled, style, index } = this.props;
        return (
            <div
                className={styles.textarea}
                style={Object.assign({ resize }, style)}
                contentEditable={!disabled}
                onBlur={this.onBlur}
                onInput={this.onInput}
                onClick={this.onClick}
                ref={'textarea' + index}>
                {this.props.children}
            </div>
        );
    };
};

Textarea.propTypes = {
    resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical', 'unset', 'inherit', 'initial']),
    disabled: PropTypes.bool,
    style: PropTypes.object,
    onChange: PropTypes.func,
    onEmpty: PropTypes.func,
    index: PropTypes.number,
    maxSize: PropTypes.number,
};

Textarea.defaultProps = {
    resize: 'vertical',
    disabled: false,
    style: null,
    onChange: noop,
    onEmpty: noop,
    index: 0,
    maxSize: 500,
};

