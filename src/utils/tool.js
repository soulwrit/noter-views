/**
 * 数据组包含某元素
 * @param {Array} array 
 * @param {Object} obj 
 */
export function objectInculdes(array, obj) {
    if (!obj) return false;
    if (typeof obj !== 'object') {
        return array.indexOf(obj) > -1;
    }
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'object' || !array[i]) continue;
        if (array[i].id === obj.id){
            return true;
        }
    }

    return false;
}