export const FILE_SEARCH = '/reader/file/search';
export const initialFileSearchState = {
    visible: true
};
export default (state, action) => {
    return Object.assign({}, state, {
        visible: action.visible
    });
};
export const openFileSearcher = () => {
    return {
        type: FILE_SEARCH,
        visible: true
    };
};
export const closeFileSearcher = () => {
    return {
        type: FILE_SEARCH,
        visible: false
    };
};