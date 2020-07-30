export const ACTIVE_MENU_INDEX = 'editor/active/menu/index';
export const activeMenuIndex = 0;
/**
 * 设置编辑器当前菜单的索引
 * @param {number} index 
 */
export const setActiveEditorMenuIndex = index => ({
    type: ACTIVE_MENU_INDEX,
    payload: index
});