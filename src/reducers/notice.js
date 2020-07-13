const MODAL_NOTICE = 'notice.modal';
const MODAL_DEL_NOTICE = 'notice.del.modal';
const MODAL_EDIT_NOTICE = 'notice.edit.modal';
const initialState = {
    modal: false,
    modalDel: false,
    delete: null,
    modalEdit: false,
    editor: null
};
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case MODAL_NOTICE: return { ...state, modal: !state.modal };
        case MODAL_EDIT_NOTICE: return { ...state, modalEdit: !state.modalEdit, editor: payload };
        case MODAL_DEL_NOTICE: return { ...state, modalDel: !state.modalDel, delete: payload };
        default: break;
    }
    return state;
}
export const onNoticeModal = () => ({ type: MODAL_NOTICE });
export const onDelNoticeModal = payload => ({ type: MODAL_DEL_NOTICE, payload });
export const onEditNoticeModal = payload => ({ type: MODAL_EDIT_NOTICE, payload });