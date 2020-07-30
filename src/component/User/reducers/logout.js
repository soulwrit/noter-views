export const USER_LOGOUT = '/user/logout';
export const initialLogoutState = {
    visible: false
};
export const openUserLogout = () => ({
    type: USER_LOGOUT,
    visible: true
});
export const closeUserLogout = () => ({
    type: USER_LOGOUT,
    visible: false
});
export default (state = initialLogoutState, action) => {
    return Object.assign({}, state, {
        visible: action.visible
    });
};