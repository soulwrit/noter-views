const MODAL_VISIBLE = 'msg.visible';
const initialState = {
    visible: false
};
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case MODAL_VISIBLE: return { ...state, visible: !state.visible };
        default: break;
    }
    return state;
}
export const onMessageModal = () => ({ type: MODAL_VISIBLE });
