import React, { memo, useEffect, useRef, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import raf from '@writ/utils/raf';
import { Icon, toast, Scrollor, Dropdown, Slot } from '@writ/react';
import * as monaco from 'monaco-editor';

import Welcome from './Welcome';
import styles from '../index.module.scss';
import { setOpenedListActive, removeOfOpenedList } from '../reducers/fileOpened';
import { getFileDetail } from '../model';
import fs from '../fs';
// import '../lang/monacoEnvironment';
const FileWriter = memo(function Writer(props) {
    const { defaultValue, getFileDetail, options, openedActive, openedFiles, overrideServices, removeOfOpenedList, setOpenedListActive, theme, } = props;
    const hasOpenedFiles = openedFiles.length > 0;
    const el = useRef();
    const editor = useRef();
    const active = useRef();
    // const isReseting = useRef();
    const subscriptor = useRef();
    const [forceRender, setForceRender] = useState(false);
    const onFileToggle = useCallback(file => {
        setOpenedListActive(file);
    }, [openedFiles, openedActive]);
    const onFileClose = (e, file) => {
        e.stopPropagation();
        removeOfOpenedList(file);
    };
    useEffect(() => {
        const onLayout = () => {
            raf(() => {
                if (editor.current) {
                    editor.current.layout();
                }
            });
        };
        window.addEventListener('resize', onLayout, false);
        return () => {
            if (editor.current) {
                editor.current.dispose();
                const models = monaco.editor.getModels();

                for (let i = 0, mod; i < models.length; i++) {
                    mod = models[i];
                    mod.dispose();
                }
                editor.current = null;
            }
            if (subscriptor.current) {
                subscriptor.current.dispose();
                subscriptor.current = null;
            }
            window.removeEventListener('resize', onLayout, false);
        }
    }, []);

    useEffect(() => {
        if (openedActive == null) return;
        if (el.current == null) {
            setForceRender(!forceRender);
            return;
        }
        if (editor.current == null) {
            editor.current = monaco.editor.create(el.current, { theme, ...options }, overrideServices);
            subscriptor.current = editor.current.onDidChangeModelContent(() => {
                // if (isReseting.current) return; 
                if (active.current == null) return;
                const file = active.current;
                const model = editor.current.getModel();

                file.content = model.getValue();
                setOpenedListActive(file);
            });
        }
        const instance = editor.current;
        const fid = openedActive.id;
        const language = fs.getType(openedActive.type);
        const uri = monaco.Uri.parse('file://'.concat(fid));
        const cached = monaco.editor.getModel(uri);

        active.current = openedActive;
        // instance.saveViewState();
        if (cached) {
            // instance.restoreViewState(); 
            // const currentValue = model.getValue(); 
            // if (value != currentValue) {
            //     instance.pushUndoStop();
            //     isReseting.current = true;
            //     model.pushEditOperations(
            //         [],
            //         [
            //             {
            //                 range: model.getFullModelRange(),
            //                 text: value
            //             }
            //         ]
            //     );
            //     instance.pushUndoStop();
            //     instance.setSelection({
            //         endColumn: 0,
            //         endLineNumber: 0,
            //         startColumn: 0,
            //         startLineNumber: 0
            //     });
            //     isReseting.current = false;
            // }
            instance.setModel(cached);
            instance.focus();
            instance.layout();
            monaco.editor.setModelLanguage(cached, language);
        } else {
            getFileDetail({ id: fid }).then(res => {
                if (res.code) {
                    throw new Error(res.msg);
                }
                const file = res.data;
                if (file == null || !file.content) return;
                const value = file.content || defaultValue;
                const model = monaco.editor.createModel(value, language, uri);

                instance.setModel(model);
                instance.focus();
                instance.layout();
            }).catch(err => {
                toast.error(err.message);
            });
        }
    }, [openedActive, forceRender]);
    useEffect(() => {
        if (!editor.current || theme == null) return;
        monaco.editor.setTheme(theme);
    }, [theme]);
    useEffect(() => {
        if (!editor.current || options == null) return;
        editor.current.updateOptions(options);
    }, [options]);

    return (
        <>
            <Slot name='tab'>
                <Scrollor size={6}>
                    {openedFiles.map(file =>
                        <div key={file.id}
                            className={classnames(styles.editTabItem, {
                                [styles.active]: openedActive && openedActive.id == file.id
                            })}
                            onClick={() => onFileToggle(file)}
                        >
                            <span>{file.name}</span>
                            <Icon className={styles.editTabItemClose} type='close' title='关闭' onClick={e => onFileClose(e, file)} />
                        </div>
                    )}
                </Scrollor>
            </Slot>
            <Slot name='tabExtra'>
                <Dropdown placement='right'>
                    <Dropdown.Head>更多</Dropdown.Head>
                    <Dropdown.Item>全部关闭</Dropdown.Item>
                    <Dropdown.Item>关闭已保存</Dropdown.Item>
                </Dropdown>
            </Slot>
            <Slot name='content'>
                <div ref={el} className={styles.monacoEditor}></div>
                <Welcome visible={hasOpenedFiles} />
            </Slot>
        </>
    );
});

FileWriter.defaultProps = {
    defaultValue: 'loading ...',
    getFileDetail: getFileDetail,
    openedActive: null,
    openedFiles: null,
    options: null,
    overrideServices: null,
    theme: void 0,
};
if (window.DEV) {
    FileWriter.propTypes = {
        defaultValue: PropTypes.string,
        getFileDetail: PropTypes.func,
        openedActive: PropTypes.object,
        openedFiles: PropTypes.array,
        options: PropTypes.object,
        overrideServices: PropTypes.object,
        theme: PropTypes.string,
    };
}
const mapStateToProps = ({ files }) => {
    return {
        openedActive: files.opened.active,
        openedFiles: files.opened.values,
    };
};
const mapDispatchToProps = {
    removeOfOpenedList,
    setOpenedListActive,
};
export default connect(mapStateToProps, mapDispatchToProps)(FileWriter);