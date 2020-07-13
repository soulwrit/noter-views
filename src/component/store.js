import { combineReducers } from 'redux';
import { applyStore } from '../utils/redux';

import users from '../reducers/users';
import files, { middleware } from '../reducers/files';
import message from '../reducers/message';
import groups from '../reducers/groups';
import notice from '../reducers/notice';
import feedback from '../reducers/feedback';
import chat from '../reducers/chat';
import statics from '../reducers/static';

export const store = applyStore(combineReducers({
    users, files, message, chat,
    groups, notice, feedback, statics
}), {
    actionMiddleware: {
        ...middleware
    }
});