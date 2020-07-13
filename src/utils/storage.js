import browser from './browser';

const cookie = {
    // 是否启用
    enabled: navigator.cookieEnabled,
    // 读取
    get(key) {
        return cookie.parse.call(cookie.parse, key);
    },
    // 存储
    set(key, value, options) {
        return cookie.parse(key, value, options);
    },
    // 删除
    remove(key, options) {
        cookie.parse(key, '', Object.assign({}, options, { expires: -1 }));
    },
    // 清空
    clear() {
        const date = new Date();
        date.setTime(date.getTime() - 10000);

        const keys = document.cookie.match(/[^ =;]+(?==)/g);
        if (keys) {
            for (let i = keys.length; i--;) {
                document.cookie = keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
            }
        }
    },
    // 是否含有
    has(key) {
        return !!this.get(key);
    },
    // 转换为JSON
    toJSON(key) {
        return cookie.parse.call({ json: true }, key);
    },
    // 解析
    parse(key, value, options) {
        if (arguments.length > 1) {
            options = Object.assign({ path: '/' }, options);

            // IE不支持 "max-age"，所以使用 expires
            if ('number' === typeof options.expires) {
                options.expires = new Date(new Date() * 1 + options.expires * 864e+5);
            }
            options.expires = options.expires ? options.expires.toUTCString() : '';

            try {
                const result = JSON.stringify(value);
                if (/^[\{\[]/.test(result)) {
                    value = result;
                }
            } catch (e) { }

            value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
            key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);

            let stringified = '';
            for (const name in options) {
                if (!options[name]) {
                    continue;
                }
                stringified += ';' + name;
                if (options[name] === true) {
                    continue;
                }

                stringified += '=' + options[name].split('; ')[0];
            }

            return (document.cookie = key + '=' + value + stringified);
        }

        // 读取
        const jar = {};
        const cookies = document.cookie ? document.cookie.split('; ') : [];

        for (let i = 0; i < cookies.length; i++) {
            const parts = cookies[i].split('=');
            let cookie = parts.slice(1).join('=');

            if (!this.json && cookie.charAt(0) === '"') {
                cookie = cookie.slice(1, -1);
            }

            try {
                const name = parts[0].replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
                cookie = cookie.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
                if (this.json) {
                    try {
                        cookie = JSON.parse(cookie);
                    } catch (e) { }
                }

                jar[name] = cookie;

                if (key === name) {
                    break;
                }
            } catch (e) {
                e.message = '[CookieError] ' + e.message;
                throw e;
            }
        }

        return key ? jar[key] : jar;
    }
};
const locale = {
    enabled: !!window.localStorage,
    /**
     * 获取
     * @param {string} key 
     */
    get(key) {
        let item = window.localStorage.getItem(key);
        if (!item) return;

        item = JSON.parse(item);
        if (item.expires) {
            const expires = parseInt(item.expires);

            if (!isNaN(expires) && expires <= new Date().getTime()) {
                return item.value;
            }

            return this.remove(key);
        }

        return item.value;
    },

    /**
     * 存储
     * @param {string|number} key
     * @param {*} val
     * @param {object} expires 过期时间单位秒
     */
    set(key, val, expires) {
        if ('number' === typeof expires && expires > 0) {
            expires = new Date().getTime() + expires * 1000;
            val = JSON.stringify({ value: val, expires: expires });
        } else {
            val = JSON.stringify({ value: val });
        }

        return window.localStorage.setItem(key, val);
    },
    // 删除
    remove(key) {
        return window.localStorage.removeItem(key);
    },
    // 清空
    clear() {
        return window.localStorage.clear();
    },
    // 是否含有
    has(key) {
        return !!window.localStorage.getItem(key);
    },
    // JSON化
    toJSON(key) {
        if (this.has(key)) {
            return this.get(key);
        }
        const jar = {};

        for (let i = 0; i < window.localStorage.length; i++) {
            const k = window.localStorage.key(i);
            jar[k] = this.get(k);
        }

        return jar;
    },
    // 监听
    onstorage(key, callback, interval) {
        let oldValue = window.localStorage[key];
        const handler = function (e) {
            e = e || window.storageEvent;

            let eKey = e.key;
            let newValue = e.newValue;

            if (!eKey) {
                const value = window.localStorage[key];

                if (value !== oldValue) {
                    eKey = key;
                    newValue = value;
                }
            }

            if (eKey === key) {
                'function' === typeof callback && callback(newValue);
                oldValue = newValue;
            }
        };

        if (browser.isUnknown()) {
            setInterval(function () { handler({}); }, interval || 500); // 检查storage是否发生变化的时间间隔
        } else if (document.attachEvent && !browser.isOpera()) {
            document.attachEvent("onstorage", handler); //IE注册在document上
        } else {
            window.addEventListener("storage", handler, false);//其他注册在window上 
        }
    }
};
const storage = {
    engine: locale.enabled ? locale : cookie.enabled ? cookie : null, // 优先本地存储
    get(key) {
        return this.engine ? this.engine.get(key) : void 0;
    },
    set(key, val, opts) {
        this.engine && this.engine.set(key, val, opts);
    },
    remove(key) {
        this.engine && this.engine.remove(key);
    },
    clear() {
        this.engine && this.engine.clear();
    },
    has(key) {
        return this.engine ? this.engine.has(key) : void 0;
    },
    toJSON(key) {
        return this.engine ? this.engine.toJSON(key) : {};
    }
};
export {
    storage,
    cookie,
    locale,
}