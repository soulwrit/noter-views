export const statics = {
    roles: {
        0: '组织者',
        1: '管理员',
        2: '普通成员'
    },
    gender: [
        { key: 0, name: '保密' },
        { key: 1, name: '男' },
        { key: 2, name: '女' },
    ]
};
export default (state = statics) => {
    return state;
}