import { createStore } from 'redux';

const isAsyncFunction = func => Object.prototype.toString.call(func) === '[object AsyncFunction]';
const isPromise = obj => Object.prototype.toString.call(obj) === '[object Promise]';
const actionMiddlewareWarpper = (actionMiddleware, store) => {
    switch (typeof actionMiddleware) {
        case 'object':
            return actionMiddleware || {};

        case 'function':
            return actionMiddleware(store);

        default:
            return {};
    }
};
export function applyStore(reducer, opts) {
    opts = opts || {};

    const store = createStore(reducer, opts.preloadedState, opts.enhancer);
    const actionMiddleware = actionMiddlewareWarpper(opts.actionMiddleware, store);

    if (typeof opts.asyncCallback !== 'function') {
        opts.asyncCallback = (action, res) => {
            if (res) {
                action.payload = res;
            }
        }
    }

    return Object.assign({}, store, {
        dispatch(action) {
            const fnMiddleware = actionMiddleware[action.type];
            if (!fnMiddleware) return store.dispatch(action);

            const middleware = [].concat(fnMiddleware);
            let i = 0;
            const next = () => {
                if (i >= middleware.length) {
                    return store.dispatch(action);
                }

                let fn = middleware[i];
                i++;

                if (typeof fn !== 'function') {
                    return store.dispatch(action);
                }

                if (isAsyncFunction(fn) || isPromise(fn)) {
                    return fn(store, next).then(res => {
                        opts.asyncCallback(action, res);
                        typeof action.callback === 'function' && action.callback(res);
                        return store.dispatch(action);
                    }).catch(err => {
                        throw err;
                    });
                }

                action.payload = fn(store, next);

                return store.dispatch(action);
            };

            store.params = action.params;
            return next();
        },
    });
}
export const observer = {
    data: [],
    store(store) {
        this.subscribe = () => {
            const state = store.getState();
            for (let i = 0, fn; i < this.data.length; i++) {
                fn = this.data[i];
                if (fn(state, () => this.data.splice(i, 1), store) /**/) break;
            }
        };

        this.unsubscribe = store.subscribe(this.subscribe);
        return this;
    },
    on(fn) {
        if (typeof fn === 'function' && this.data.indexOf(fn) === -1) {
            this.data.push(fn);
        }

        return this;
    }
}