// 编辑器当前打开的文件和菜单 
export const FILE_LOCAL_OPENED = '/editor/file/local/opened';
export const FILE_LOCAL_CLOSED = '/editor/file/local/closed';
export const FILE_LOCAL_REFRESH = '/editor/file/local/refresh';
export const FILE_LOCAL_CREATE = '/editor/file/local/create';
export const initialFileOpenedState = {
    active: null,
    values: [], 
};
/**
 * 设置当前打开的文件或文件夹
 * @param {object} file
 */
export const setOpenedListActive = file => ({
    type: FILE_LOCAL_OPENED,
    payload: file,
});
/**
 * 关闭本地文件
 * @param {number} index 
 */
export const removeOfOpenedList = index => ({
    type: FILE_LOCAL_CLOSED,
    payload: index
});
/**
 * 刷新本地文件
 * @param {object} file 
 */
export const refreshOpenedList = file => ({
    type: FILE_LOCAL_REFRESH,
    payload: file
});
/**
 * 新增本地文件
 * @param {object} file 
 */
export const appendToOpenedList = file => ({
    type: FILE_LOCAL_CREATE,
    payload: file
});
export default (state = initialFileOpenedState, action) => {
    const { type, payload } = action;
    let newState;

    switch (type) {
        // 当前打开的文件切换
        case FILE_LOCAL_OPENED:
            newState = {
                active: payload,
                values: state.values,
            };
            break;
        // 文件本地关闭
        case FILE_LOCAL_CLOSED:
            {
                let index;
                switch (typeof payload) {
                    case 'number':
                        index = payload;
                        break;
                    case 'object':
                        index = state.values.indexOf(payload);
                        break;
                    default:
                        break;
                }

                if (index >= 0 && index < state.values.length) {
                    const activeIndex = state.values.indexOf(state.active);

                    state.values.splice(index, 1);
                    newState = {
                        active: state.active,
                        values: [].concat(state.values),
                    };
                    if (index === activeIndex) {
                        newState.active = newState.values[(index - 1) < 0 ? 0 : (index - 1)];
                    }
                }
            }
            break;
        // 本地新增文件
        case FILE_LOCAL_CREATE: {
            let isReplaced;
            const replaced = state.values.filter((item, index, array) => {
                if (item.id === payload.id) {
                    isReplaced = true;
                    array.splice(index, 1, payload);
                }
                return item;
            });
            newState = {
                active: payload,
                values: isReplaced ? replaced : [].concat(state.values, payload),
            };
        } break;
        // 刷新本地文件
        case FILE_LOCAL_REFRESH:
            newState = {
                active: payload,
                values: state.values.map(item => {
                    if (item.id === payload.id) {
                        return Object.assign({}, item, payload);
                    }
                    return item;
                })
            };
            break;
    }

    return Object.assign({}, state, newState);
}