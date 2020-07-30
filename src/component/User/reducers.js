import keepLoginReducer, { initialLoginState, USER_LOGIN } from './reducers/login';
import userRequiredReducer, { initialRequiredState, USER_SYSTEM_REQUIRED, setUserRequired } from './reducers/required';
import userLogoutReducer, { initialLogoutState, USER_LOGOUT, openUserLogout } from './reducers/logout';

const MODAL_PROFILE = '/user/profile';
const MODAL_EDIT_INF = '/user/edit';
const MODAL_EDIT_PWD = '/user/edit/pwd';
const initialState = {
    login: initialLoginState,
    logout: initialLogoutState,

    id: initialRequiredState.id,
    token: initialRequiredState.token,

    modalProfile: false,
    modalLogout: false,
    modalEditPwd: false,
    modalEditInf: false,
    activing: null,
};
export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        // 用户登录
        case USER_LOGIN: return {
            ...state,
            login: keepLoginReducer(state.login, action)
        };
        case USER_SYSTEM_REQUIRED: return userRequiredReducer(state, action);
        // 用户退出
        case USER_LOGOUT: return {
            ...state,
            logout: userLogoutReducer(state.logout, action)
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
export {
    setUserRequired,
    openUserLogout
};
export const onProfileModal = payload => ({ type: MODAL_PROFILE, payload });
export const onEditPwdModal = () => ({ type: MODAL_EDIT_PWD });
export const onEditInfoModal = () => ({ type: MODAL_EDIT_INF });