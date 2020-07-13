/*{
    type: 0, // 聊天类型 0:群聊 1:用户对用户 (p2p)
    name: '组织名称',
    id: 1,  // 当为群聊时，为组织ID，p2p时为用户ID
    latestMessage: '最新消息',
    latestCreatedAt: Date.now(), // 最新消息的发送时间
}*/
export default {
    includes,
    sort,
    remove
}

/**
 * 是否存在
 * @param {Array} array 
 * @param {Object} current 
 * @returns {Boolean}
 */
function includes(array, current) {
    for (let i = 0; i < array.length; i++) {
        if (current.id === array[i].id) return true;
    }

    return false;
}

/**
 * 根据最新消息的发送时间排序
 * @param {Array} array   
 * @returns {Array}
 */
function sort(array) {
    return [].concat(array.sort(function (a, b) {
        return a.latestCreatedAt - b.latestCreatedAt;
    }));
}

/**
 * 根据id字段删除
 * @param {Array} array  
 * @param {Number} id
 * @returns {Array}
 */
function remove(array, id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) { 
            array.splice(i, 1);
        }
    }

    return [].concat(array);
}