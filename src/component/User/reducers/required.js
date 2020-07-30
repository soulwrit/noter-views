import { storage } from '../../../utils/storage';
export const USER_SYSTEM_REQUIRED = '/user/system/required';
export const initialRequiredState = {
    id: storage.get('access_uid'),
    token: storage.get('access_token'),
};
export const setUserRequired = (id, token) => ({
    type: USER_SYSTEM_REQUIRED,
    id,
    token,
    clearable: false,
});
export const clsUserRequired = () => ({
    type: USER_SYSTEM_REQUIRED,
    clearable: true
});
export default (state, action) => {
    const { clearable, id, token } = action;

    if (clearable) {
        storage.remove('access_uid');
        storage.remove('access_token');

        return {
            ...state,
            ...{ id: void 0, token: void 0 }
        };
    }

    storage.set('access_uid', id);
    storage.set('access_token', token);
    return {
        ...state,
        ...{ id, token }
    };
};