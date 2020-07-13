// 是否为团队开创者
function isGroupCreator(rid) {
    return rid === Number(false);
}
// 是否为团队管理员
function isGroupManager(rid) {
    return rid === Number(true);
}
// 是否为创建者或者管理员
function isGroupAdmin(rid) {
    return isGroupCreator(rid) || isGroupManager(rid);
}
export {
    isGroupAdmin, isGroupCreator, isGroupManager
}