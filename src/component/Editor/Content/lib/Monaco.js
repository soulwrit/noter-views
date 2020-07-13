// import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
/* global monaco */
import 'monaco-editor';
import React from 'react';
import PropTypes from 'prop-types';

function noop() { }

export default class MonacoEditor extends React.Component {
    static propTypes = {
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        language: PropTypes.string,
        theme: PropTypes.string,
        options: PropTypes.object,
        overrideServices: PropTypes.object,
        onWillMount: PropTypes.func,
        onDidMount: PropTypes.func,
        onChange: PropTypes.func,
    }
    static defaultProps = {
        width: "100%",
        height: "100%",
        value: null,
        defaultValue: "",
        language: "",
        theme: null,
        options: {},
        overrideServices: {},
        onWillMount: noop,
        onDidMount: noop,
        onChange: noop,
    }
    constructor(props) {
        super(props);
        this.containerElement = undefined;
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps) {
        const { value, language, theme, height, options, width } = this.props;
        const model = this.editor.getModel();

        if (this.props.value != null && this.props.value !== model.getValue()) {
            this.__prevent_trigger_change_event = true;
            this.editor.pushUndoStop();
            model.pushEditOperations(
                [],
                [
                    {
                        range: model.getFullModelRange(),
                        text: value
                    }
                ]
            );
            this.editor.pushUndoStop();
            this.__prevent_trigger_change_event = false;
        }
        if (prevProps.language !== language) {
            monaco.editor.setModelLanguage(model, language);
        }
        if (prevProps.theme !== theme) {
            monaco.editor.setTheme(theme);
        }
        if (this.editor && (width !== prevProps.width || height !== prevProps.height)) {
            this.editor.layout();
        }
        if (prevProps.options !== options) {
            this.editor.updateOptions(options);
        }
    }

    componentWillUnmount() {
        this.destroy();
    }

    assignRef = component => {
        this.containerElement = component;
    }

    destroy() {
        if (this.editor) {
            this.editor.dispose();
            const model = this.editor.getModel();
            if (model) {
                model.dispose();
            }
        }
        if (this._subscription) {
            this._subscription.dispose();
        }
    }

    init() {
        const value = this.props.value != null ? this.props.value : this.props.defaultValue;
        const { language, theme, options, overrideServices } = this.props;
        if (this.containerElement) {

            Object.assign(options, this.props.onWillMount(monaco)); // monaco editor 初始化之前
            this.editor = monaco.editor.create(
                this.containerElement,
                {
                    value,
                    language,
                    ...options,
                    ...(theme ? { theme } : {})
                },
                overrideServices
            );

            this.props.onDidMount(this.editor, monaco);// monaco editor 初始化以后 
            this._subscription = this.editor.onDidChangeModelContent(event => {
                if (!this.__prevent_trigger_change_event) {
                    this.props.onChange(this.editor.getValue(), event);
                }
            });
        }
    }

    render() {
        const { width, height, style, className } = this.props;

        return React.createElement('div', {
            ref: this.assignRef,
            className,
            style: Object.assign({ width, height }, style)
        });
    }
}