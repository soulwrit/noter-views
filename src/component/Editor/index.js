import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Slot, SlotProvider } from '@writ/react';

import Layout from './Layout';
import menus from './menus';

import { setActiveEditorMenuIndex } from './reducers/menu';
import { openFileSaver } from './reducers/fileSaver';
import { openFileEditor } from './reducers/fileEditor';

import FileDeleter from './Module/FileDeleter';
import FileEditor from './Module/FileEditor';
import FileSaver from './Module/FileSaver';
import FileWriter from './Module/FileWriter';

const EditorLogic = memo(function Logic(props) {
    const {
        activeMenuIndex,
        fileDeleterVisible, fileEditorVisible, fileSaverVisible,
        menus, setActiveMenuIndex,
    } = props;
    const Menu = menus[activeMenuIndex].Menu;
 
    return (
        <SlotProvider>
            <Slot name='menu'>
                {menus.map((menu, index) => (
                    <span key={menu.key} onClick={() => setActiveMenuIndex(index)}>{menu.icon}</span>
                ))}
            </Slot>
            <Menu></Menu>
            <FileWriter />
            <Layout></Layout>
            {fileSaverVisible ? <FileSaver /> : null}
            {fileDeleterVisible ? <FileDeleter /> : null}
            {fileEditorVisible ? <FileEditor /> : null}
        </SlotProvider>
    );
});

EditorLogic.defaultProps = {
    activeMenuIndex: 0,
    fileDeleterVisible: false,
    fileEditorVisible: false,
    fileSaverVisible: false,
    menus,
};
if (window.DEV) {
    EditorLogic.propTypes = {
        activeMenuIndex: PropTypes.number,
        getFileDetail: PropTypes.func,
        fileDeleterVisible: PropTypes.bool,
        fileEditorVisible: PropTypes.bool,
        fileSaverVisible: PropTypes.bool,
        menus: PropTypes.array,
    };
}
const mapStateToProps = ({ files }) => {
    return {
        activeMenuIndex: files.activeMenuIndex,
        fileDeleterVisible: files.deleter.visible,
        fileEditorVisible: files.editor.visible,
        fileSaverVisible: files.saver.visible,
    };
};
const mapDispatchToProps = {
    openFileSaver,
    openFileEditor,
    setActiveMenuIndex: setActiveEditorMenuIndex,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditorLogic);