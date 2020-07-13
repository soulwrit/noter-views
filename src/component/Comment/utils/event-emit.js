export default class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, fn) {
        let fnList = this.events[eventName] || [];
        fnList.push(fn)
        if (eventName) {
            this.events[eventName] = fnList;
        }
    }

    emit(eventName, ...agr) {
        let funcs = this.events[eventName];
        if (funcs && funcs.length) {
            for (let j = 0; j < funcs.length; j++) {
                funcs[j](...agr);
            }
        }
    }

    off(eventName, fn) {
        if (this.events[eventName]) {
            if (fn) {
                this.events[eventName].splice(fn, 1);
            } else {
                delete this.events[eventName];
            }
        }
    }
};