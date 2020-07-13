const get = function () {
    const browser = { name: 'unknown', version: 0 };
    const userAgent = window.navigator.userAgent.toLowerCase();

    if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent)) {
        browser.name = RegExp.$1;
        browser.version = RegExp.$2;
    } else if (/version\D+(\d[\d.]*).*safari/.test(userAgent)) {
        browser.name = 'safari';
        browser.version = RegExp.$2;
    }
    return browser;
};
const browser = get();
const isUnknown = function (name) { return (name || browser.name) === 'unknown' };
const isOpera = function (name) { return (name || browser.name) === 'opera' };

export default {
    isOpera,
    isUnknown,
    get,
    name: browser.name,
    version: browser.version,
}