import { storage } from '../../../utils/storage';
export const USER_LOGIN = '/user/login';
export const initialLoginState = {
    account: storage.get('account'),
    checked: !!storage.get('checked'),
};
export const setUserKeepLogin = (checked, account) => ({
    type: USER_LOGIN,
    account,
    checked: !!checked,
});
export default (state = initialLoginState, action) => {
    const { account, checked } = action;
    const newState = { checked };

    storage.set('checked', checked);
    if (account) {
        newState.account = account;
        storage.set('account', account);
    }

    return Object.assign({}, state, newState);
}