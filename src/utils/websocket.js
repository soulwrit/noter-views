/**
 * 连接websocket
 * @param {string} url 
 * @param {object} visitor 
 * @param {function} visitor.onOpen
 * @param {function} visitor.onClose
 * @param {function} visitor.onError
 * @param {function} visitor.onData
 * @returns {WebSocket}
 */
export function useWebsocket(url, visitor) {
    const ws = new WebSocket(url);
    ws.onerror = function (e) {
        visitor.onError(new Error('Websocket connect failed!'), e);
    }
    ws.onopen = function (e) {
        visitor.onOpen(e);
    }
    ws.onmessage = function (e) {
        /*  
        * @param {object} data 来自客户端的数据信息
        * @param {string} data.type   - request
        * @param {*}      data.body   - 消息内容
        * @param {string} data.method - 请求的处理 HTTP (method) 方式
        * @param {string} data.source - 消息来源的URL，ws将会代理此请求，返回此请求的结果
        * @param {string} data.target - 将得到的消息抄送给指定的目标，包括自己
        */
        visitor.onData(JSON.parse(e.data));
    }
    ws.onclose = function (e) {
        visitor.onClose(e);
    }
    
    return ws;
}