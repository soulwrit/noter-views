export const FILE_DELETER = '/editor/file/deleter';
export const initialFileDeleterState = {
    value: null,
    visible: false,
};
export const openFileDeleter = value => ({
    type: FILE_DELETER,
    value,
    visible: true,
});
export const closeFileDeleter = () => ({
    type: FILE_DELETER,
    value: null,
    visible: false,
});
export default (state = initialFileDeleterState, action) => {
    return Object.assign({}, state, {
        value: action.value,
        visible: action.visible,
    });
};