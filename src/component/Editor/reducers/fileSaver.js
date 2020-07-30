export const FILE_SAVER = '/file/saver';
export const initialFileSaverState = {
    value: null,
    visible: false
};
// 打开文件保存弹框
export const openFileSaver = value => ({
    type: FILE_SAVER,
    value,
    visible: true
});
// 关闭文件保存弹框
export const closeFileSaver = () => ({
    type: FILE_SAVER,
    value: null,
    visible: false
});
export default (state = initialFileSaverState, action) => {
    return Object.assign({}, state, {
        value: action.value,
        visible: action.visible,
    });
};