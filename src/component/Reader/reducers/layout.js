export const LAYOUT_BASIC = '/reader/layout';
export const LAYOUT_BASIC_MESSAGE = '/reader/layout/message';
export const initialLayoutState = {
    views: [],
    viewKey: 'my',
    messageBoxVisible: false
};
export const setReaderViewKey = key => ({
    type: LAYOUT_BASIC,
    viewKey: key
});
export const openReaderLayoutMessageBox = () => ({
    type: LAYOUT_BASIC,
    subType: LAYOUT_BASIC_MESSAGE,
    visible: true
});
export const closeReaderLayoutMessageBox = () => ({
    type: LAYOUT_BASIC,
    subType: LAYOUT_BASIC_MESSAGE,
    visible: false
});
export default (state = initialLayoutState, action) => {
    switch (action.subType) {
        case LAYOUT_BASIC_MESSAGE:
            return Object.assign({}, state, {
                messageBoxVisible: action.visible,
            });

        default:
            break;
    }
    
    return Object.assign({}, state, {
        viewKey: action.viewKey,
        messageBoxVisible: action.viewKey === 'my'
    });
}