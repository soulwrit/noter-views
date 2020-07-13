export default {
    to,
    format,
    isToday,
    getTodayStartTime,
    getPersonalTime
}
/**
 * [to 任意对象转日期高度容错]
 * @param  {Object} obj [要转换的日期]
 * @return {Date}     [description]
 */
export function to(obj) {
    if (obj instanceof Date || Object.prototype.toString.call(obj) === '[object Date]') {
        return new Date(obj);
    } else if (!isNaN(obj)) {
        return new Date(parseInt(obj, 10)); // 数字或数字字符串转日期
    } else if (!isNaN(Date.parse(obj))) {
        return new Date(Date.parse(obj)); // UTC格式字符串转日期
    }
    return new Date(); // null, undefined, 0, '' 均返回当前时间
}

/**
 * [format 格式化显示日期时间]
 * @param  {String | Number} date [待显示的日期时间，可以为数字形式]
 * @param  {String} fmt [需要显示的格式，例如yyyy-MM-dd hh:mm:ss]
 * @return {String}     [格式化好的时间]
 */
export function format(date, fmt) {
    date = to(date); // 保证date是日期类型(时间戳或UTC字符串转日期)
    if (!fmt) {
        fmt = 'yyyy-MM-dd hh:mm:ss';
    }
    const o = {
        y: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
    };

    return fmt.replace(/(y+|M+|d+|h+|m+|s+)/g, function (item) {
        const len = item.length;
        return ((len > 1 ? '0' : '') + o[item.slice(-1)]).slice(-(len > 2 ? len : 2));
    });
}

/**
 * 86400000 Zero
 * 获取今天0点
 */
export function getTodayStartTime() {
    return new Date(new Date().toLocaleDateString()).getTime();
}

/**
 * 指定时间点是否落在今天以内
 * @param {Number} timestamp 
 */
export function isToday (timestamp){
    return timestamp - getTodayStartTime() >= 0;
}

// 人性化时间
export function getPersonalTime (time){
    return  format(time, isToday(time) ? 'hh:mm' : 'MM-dd');
}