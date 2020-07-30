export const FILE_LIST = '/editor/file/list';
export const FILE_CREATE = '/editor/file/create';
export const FILE_DELETE = '/editor/file/delete';
export const FILE_UPDATE = '/editor/file/update';
export const values = [];
/**
 * 读取远程文件列表
 * @param {object} params 
 * @param {function} callback 
 */
export const getFiles = (params, callback) => ({
    type: FILE_LIST,
    params,
    callback
});
/**
 * 远程更新/新建文件 
 * @param {boolean} isAdd 
 * @param {object} params 
 */
export const setFiles = (isAdd, params) => ({
    type: isAdd ? FILE_CREATE : FILE_UPDATE,
    params
});
/**
 * 删除远程文件
 * @param {object} params 
 */
export const delFiles = params => ({
    type: FILE_DELETE,
    params
});
