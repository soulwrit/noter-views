export const FILE_EDITOR = '/editor/file/creator';
export const initialFileEditorState = {
    pid: null,
    type: 1,
    value: null,
    visible: false,
};
export const openFileEditor = (type, value, pid) => ({
    type: FILE_EDITOR,
    editType: type,
    pid: pid,
    value: value,
    visible: true,
});
export const closeFileEditor = () => ({
    type: FILE_EDITOR,
    editType: initialFileEditorState.type,
    pid: null,
    value: null,
    visible: false,
});
export default (state = initialFileEditorState, action) => {
    return Object.assign({}, state, {
        pid: action.pid,
        type: action.editType,
        value: action.value,
        visible: action.visible,
    });
};