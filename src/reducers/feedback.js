const MODAL_DEL = '/feedback/del';
const MODAL_EDIT = '/feedback/edit';
const initialState = {
    maxLength: 200,
    modalEdit: false,
    editor: null,
    modalDel: false,
    delete: null,
};
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case MODAL_DEL: return { ...state, modalDel: !state.modalDel, delete: payload };
        case MODAL_EDIT: return { ...state, modalEdit: !state.modalEdit, editor: payload };
        default: break;
    }
    return state;
}
export const onDelFeedbackModal = payload => ({ type: MODAL_DEL, payload });
export const onEditFeedbackModal = payload => ({ type: MODAL_EDIT, payload });