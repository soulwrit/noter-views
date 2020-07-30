import fileSearchReducer, { initialFileSearchState, FILE_SEARCH } from './reducers/fileSearcher';
import viewLayoutReducer, { initialLayoutState, LAYOUT_BASIC } from './reducers/layout';
export const initialReaderState = {
    searcher: initialFileSearchState,
    layout: initialLayoutState
};
export default (state = initialReaderState, action) => {
    const { type } = action;
    let newState = null; 
    switch (type) {
        // 文件搜索
        case FILE_SEARCH:
            newState = {
                searcher: fileSearchReducer(state.searcher, action)
            };
            break;
        // 布局切换
        case LAYOUT_BASIC:
            newState = {
                layout: viewLayoutReducer(state.layout, action)
            };
            break;
        default: break;
    }

    return Object.assign({}, state, newState);
};