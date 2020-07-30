import { activeMenuIndex, ACTIVE_MENU_INDEX } from './reducers/menu';
import fileDeleterReducer, { initialFileDeleterState, FILE_DELETER } from './reducers/fileDeleter';
import fileEditorReducer, { initialFileEditorState, FILE_EDITOR } from './reducers/fileEditor';
import fileOpenedReducer, { initialFileOpenedState, FILE_LOCAL_CLOSED, FILE_LOCAL_CREATE, FILE_LOCAL_OPENED, FILE_LOCAL_REFRESH } from './reducers/fileOpened';
import fileSaverReducer, { initialFileSaverState, FILE_SAVER } from './reducers/fileSaver';
import { values, FILE_CREATE, FILE_DELETE, FILE_LIST, FILE_UPDATE } from './reducers/file';
import { getFiles, createFile, deleteFile, updateFile, } from './model';
export const middleware = {
    async [FILE_LIST](ctx) {
        const { files } = ctx.getState();
        return getFiles(ctx.params) || files.values;
    },
    async [FILE_CREATE](ctx) {
        return createFile(ctx.params);
    },
    async [FILE_UPDATE](ctx) {
        return updateFile(ctx.params);
    },
    async [FILE_DELETE](ctx) {
        return deleteFile(ctx.params);
    }
};
export const initialEditorState = {
    values,
    activeMenuIndex,

    deleter: initialFileDeleterState,
    editor: initialFileEditorState,
    opened: initialFileOpenedState,
    saver: initialFileSaverState,
};
export default (state = initialEditorState, action) => {
    const { payload, type } = action;
    let newState = null;

    switch (type) {
        // 菜单切换
        case ACTIVE_MENU_INDEX:
            newState = { activeMenuIndex: payload };
            break;
        // 本地文件操作
        case FILE_LOCAL_CLOSED:
        case FILE_LOCAL_CREATE:
        case FILE_LOCAL_OPENED:
        case FILE_LOCAL_REFRESH:
            newState = { opened: fileOpenedReducer(state.opened, action) };
            break;
        // 文件删除
        case FILE_DELETER:
            newState = { deleter: fileDeleterReducer(state.deleter, action) };
            break;
        // 文件编辑/新增
        case FILE_EDITOR:
            newState = { editor: fileEditorReducer(state.editor, action) };
            break;
        // 文件保存
        case FILE_SAVER:
            newState = { saver: fileSaverReducer(state.saver, action) };
            break;

        // 新增远程文件
        case FILE_CREATE:
            newState = { values: [payload].concat(state.values) };
            break;
        // 删除远程文件
        case FILE_DELETE:
            newState = {
                values: state.values.filter(
                    item => item.id !== payload.id
                )
            };
            break;
        // 更新远程文件
        case FILE_UPDATE:
            newState = {
                values: state.values.map(item => {
                    if (item.id === payload.id) {
                        return Object.assign({}, item, payload);
                    }
                    return item;
                })
            };
            break;
        // 获取文件列表
        case FILE_LIST:
            newState = { values: payload || [] };
            break;
        default: break;
    }

    return Object.assign({}, state, newState);
};