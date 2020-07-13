import { storage } from '../utils/storage';
import { keys } from './keys';

const REQUIRED = '/user/required';
const MODAL_LOGOUT = '/user/logout';
const MODAL_PROFILE = '/user/profile';
const MODAL_EDIT_INF = '/user/edit';
const MODAL_EDIT_PWD = '/user/edit/pwd';
const initialState = {
    account: storage.get(keys.account),
    keepalive: !!storage.get(keys.keep),
    id: storage.get(keys.id),
    token: storage.get(keys.token),
    modalProfile: false,
    modalLogout: false,
    modalEditPwd: false,
    modalEditInf: false,
    activing: null
};
const setRequired = (state, payload) => {
    switch (typeof payload) {
        case 'number':
            storage.set(keys.id, payload);
            return { ...state, id: payload }
        case 'boolean':
            storage.set(keys.keep, payload);
            return { ...state, keepalive: payload };
        case 'object': {
            const fields = ['account', 'id', 'keepalive', 'token'];
            const tmp = {};

            for (const key in payload) {
                if (fields.includes(key)) {
                    storage.set(keys[key], payload[key]);
                    tmp[key] = payload[key];
                }
            }
            return { ...state, ...tmp };
        }
        default: break;
    }
    return state;
};
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case REQUIRED: return setRequired(state, payload);
        case MODAL_LOGOUT: return {
            ...state,
            modalLogout: !state.modalLogout
        };
        case MODAL_PROFILE: return {
            ...state,
            modalProfile: !state.modalProfile,
            activing: payload
        };
        case MODAL_EDIT_PWD: return {
            ...state,
            modalEditPwd: !state.modalEditPwd
        };
        case MODAL_EDIT_INF: return {
            ...state,
            modalEditInf: !state.modalEditInf
        };
        default: break;
    }
    return state;
};
export const setUserRequired = payload => ({ payload, type: REQUIRED });
export const onLogoutModal = () => ({ type: MODAL_LOGOUT });
export const onProfileModal = payload => ({ type: MODAL_PROFILE, payload });
export const onEditPwdModal = () => ({ type: MODAL_EDIT_PWD });
export const onEditInfoModal = () => ({ type: MODAL_EDIT_INF });
