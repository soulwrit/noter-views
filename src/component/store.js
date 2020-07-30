import { combineReducers } from 'redux';
import { applyStore } from '../utils/redux';

import files, { middleware } from './Editor/reducers';
import reader from './Reader/reducers';
import users from './User/reducers';
import message from '../reducers/message';
import groups from '../reducers/groups';
import notice from '../reducers/notice';
import feedback from '../reducers/feedback';
import chat from '../reducers/chat';
import statics from '../reducers/static';


export const store = applyStore(combineReducers({
    users, files, reader, message, chat,
    groups, notice, feedback, statics
}), {
    actionMiddleware: {
        ...middleware
    }
});