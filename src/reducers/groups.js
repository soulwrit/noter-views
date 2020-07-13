const MODAL_DISMISS = 'grp.dismiss'; // 解散组织
const MODAL_FIRE_MEMBER = 'grp.fire.member'; // 群主从组织中踢出成员
const MODAL_EXIT_GROUP = 'grp.exit'; // 用户主动退出组织
const MODAL_JOIN_GROUP = 'grp.join'; // 加入组织的申请或邀请
const MODAL_AUDIT_GROUP = 'grp.join.audit'; // 加入组织的审核
const MODAL_GROUP = 'grp.home'; // 用户组织主页 
const MODAL_PROFILE = 'grp.profile'; // 组织资料卡
const EDITING_GROUP = 'grp.editing'; // 编辑组织信息
const initialState = {
    modalDismiss: false,
    modalFireMember: false,
    modalExitGroup: false,
    modalProfile: false,
    modalIndex: false,
    modalJoinGroup: false,
    modalJoinGroupAudit: false,
    editing: null,
    auditing: null,
    firing: null,
    activing: null
};
export default function (state = initialState, { type, payload }) {
    switch (type) {
        case MODAL_DISMISS:
            return {
                ...state,
                modalDismiss: !state.modalDismiss
            };
        case MODAL_FIRE_MEMBER:
            return {
                ...state,
                modalFireMember: !state.modalFireMember,
                firing: payload
            };
        case MODAL_EXIT_GROUP:
            return {
                ...state,
                modalExitGroup: !state.modalExitGroup
            };
        case MODAL_GROUP:
            return {
                ...state,
                modalIndex: !state.modalIndex
            };
        case MODAL_JOIN_GROUP:
            return {
                ...state,
                modalJoinGroup: !state.modalJoinGroup
            };
        case MODAL_AUDIT_GROUP:
            return {
                ...state,
                modalJoinGroupAudit: !state.modalJoinGroupAudit,
                auditing: payload
            };
        case MODAL_PROFILE:
            return {
                ...state,
                modalProfile: !state.modalProfile,
                activing: payload
            };
        case EDITING_GROUP:
            return {
                ...state,
                editing: payload
            };
        default:
            break;
    }
    return state;
}
export const onDismissModal = () => ({ type: MODAL_DISMISS });
export const onFireMemberModal = payload => ({ type: MODAL_FIRE_MEMBER, payload });
export const onExitGroupModal = () => ({ type: MODAL_EXIT_GROUP });
export const onGroupModal = () => ({ type: MODAL_GROUP });
export const onJoinGroupModal = () => ({ type: MODAL_JOIN_GROUP });
export const onJoinGroupAuditModal = payload => ({ type: MODAL_AUDIT_GROUP, payload });
export const onGroupProfileModal = payload => ({ type: MODAL_PROFILE, payload });
export const setEditingGroup = payload => ({ payload, type: EDITING_GROUP });