
import EventEmitter from './event-emit';
import { getPosition, setPosition } from './edit-cursor';

export const emitter = new EventEmitter();
export const EVENTS = {
    TEXTAREA_INSERT_CONTENT: 'textarea-insert-content',
    TEXTAREA_INSERT_CURSOR: 'textarea-insert-cursor',
    TEXTAREA_CLEAN: 'textarea-clean',
    MESSAGE_SHOW_CHILDREN: 'message-show-children',
    MESSAGE_HIDE_CHILDREN: 'message-hide-children',
};
export const cursor = { getPosition, setPosition };
export const array = [];
export const emptyObject = {};
export function noop() { };
export function toHTMLNode(html) {
    const div = document.createElement('div');
    div.innerHTML = html;

    return div.firstElementChild;
}
export function toTextNode(str) {
    return document.createTextNode(str);
}
export function unique(array) {
    return array.filter(function (item, index, arr) {
        return arr.indexOf(item) === index;
    });
}

export function dateToLocaleString(datetime) {
    return new Date(datetime).toLocaleString();
}