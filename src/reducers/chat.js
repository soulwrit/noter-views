import activityUtils from '../utils/activity';

const MODAL_VISIBLE = 'chat.visible';
const MODAL_MAXIMIZE = 'chat.maximize';
const MODAL_MINIMIZE = 'chat.minimize';
const SET_ACTIVITY_INDEX = 'chat.set-activity-index';
const DEL_ACTIVITY = 'chat.del-activity';
const initialState = {
    visible: false,
    maximized: false,
    viewport: {
        [false]: {
            width: 800,
            height: 500,
        },
        [true]: {
            width: '100%',
            height: '100%',
        }
    },
    activity: [
        {
            type: 0, // 聊天类型 0:群聊 1:用户对用户 (p2p)
            name: '组织名称',
            id: 1,  // 当为群聊时，为组织ID，p2p时为用户ID
            latestMessage: '最新消息',
            latestCreatedAt: Date.now(), // 最新消息的发送时间
        },
        {
            type: 1,
            name: '用户名称',
            id: 1,
            latestMessage: '最新消息',
            latestCreatedAt: Date.now(),
        },
    ],
    activityIndex: 0
};
export default function (state = initialState, { type, payload }) {
    switch (type) {
        case MODAL_VISIBLE:
            return { ...state, visible: !state.visible };
        case MODAL_MAXIMIZE:
            return {
                ...state,
                maximized: !state.maximized
            };
        case MODAL_MINIMIZE:
            return {
                ...state,
                visible: false
            };
        case SET_ACTIVITY_INDEX:
            return {
                ...state,
                activityIndex: payload > -1 ? payload : state.activityIndex
            };
        case DEL_ACTIVITY:
            return {
                ...state,
                activity: activityUtils.remove(state.activity, payload),
                activityIndex: 0
            };
        default:
            break;
    }
    return state;
}
export function onMaximize() { return { type: MODAL_MAXIMIZE }; }
export function onMinimize() { return { type: MODAL_MINIMIZE }; }
export function onVisible() { return { type: MODAL_VISIBLE }; }
export function setActivityIndex(payload) { return { type: SET_ACTIVITY_INDEX, payload }; }
export function delActivity(payload) { return { type: DEL_ACTIVITY, payload }; }



