import { toast } from '../component/lib';
import { http } from '@writ/utils/request-fetch';
import { objectInculdes } from '../utils/tool';

const TYPE_GET = '/file/get';
const TYPE_DEL = '/file/del';
const TYPE_ADD = '/file/add';
const TYPE_UPD = '/file/upd';
const TYPE_EDITED_ADD = '/file/edited/add';
const TYPE_EDITED_DEL = '/file/edited/del';
const TYPE_EDITED_UPD = '/file/edited/upd';
const TYPE_NEW_VISIBLE = '/file/visible';
const TYPE_DEL_VISIBLE = '/file/del/visible';
const TYPE_SAVE_VISIBLE = '/file/save/visible';
const TYPE_ACTIVATE = '/file/activate';
const initialState = {
    values: [],
    edited: [],
    activate: null,
    createdType: 2,
    visible: false,
    delVisible: false,
    saveVisible: false
};
const reducer = (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case TYPE_GET:
            return {
                ...state,
                values: payload || []
            };
        case TYPE_ADD:
            return {
                ...state,
                values: [{ ...payload }, ...state.values]
            };
        case TYPE_DEL:
            return {
                ...state,
                values: state.values.filter(
                    item => item.id !== payload.id
                )
            };
        case TYPE_UPD:
            return {
                ...state,
                values: state.values.map(item => {
                    if (item.id === payload.id) {
                        return Object.assign({}, item, payload);
                    }

                    return item;
                })
            };
        case TYPE_ACTIVATE:
            return {
                ...state,
                activate: payload >= 0 ? state.edited[payload] : payload
            };
        case TYPE_EDITED_ADD:
            return {
                ...state,
                edited: objectInculdes(state.edited, payload)
                    ? state.edited.filter((item, index, array) => {
                        if (item.id === payload.id) {
                            array.splice(index, 1, payload);
                        }
                        return item;
                    }) : [...state.edited, payload],
                activate: payload
            };
        case TYPE_EDITED_DEL: {
            let edited;

            if (payload >= 0) {
                state.edited.splice(payload, 1);
                edited = [].concat(state.edited);
            } else {
                edited = state.edited.filter(item => item.id !== payload.id);
            }
            return {
                ...state,
                edited
            };
        }
        case TYPE_EDITED_UPD:
            return {
                ...state,
                edited: state.edited.map(item => {
                    if (item.id === payload.id) {
                        return Object.assign({}, item, payload);
                    }
                    return item;
                })
            };
        case TYPE_NEW_VISIBLE: {
            const visible = !state.visible;
            return {
                ...state,
                visible,
                createdType: visible && payload > 0 ? payload : state.createdType
            };
        }
        case TYPE_DEL_VISIBLE:
            return {
                ...state,
                delVisible: !state.delVisible
            };
        case TYPE_SAVE_VISIBLE:
            return {
                ...state,
                saveVisible: !state.saveVisible
            };
        default: break;
    }
    return state;
};
const middleware = {
    async [TYPE_GET](ctx) {
        const { files } = ctx.getState();

        try {
            return http.get('/files', ctx.params).then(res => {
                if (res.code) {
                    throw new Error(res.msg);
                }

                return res.data;
            }).catch(err => {
                toast.error(err.message);
            });
        } catch (err) {
            toast.error(err.message);
        }

        return files.values;
    },
    async [TYPE_ADD](ctx) {
        const data = ctx.params;

        try {
            return http.post('/files', data).then(res => {
                if (res.code) throw new Error(res.msg);

                return { ...data, id: res.data.id };
            }).catch(err => {
                toast.error(err.message);
            });
        } catch (err) {
            toast.error(err.message);
        }
    },
    async [TYPE_UPD](ctx) {
        const data = ctx.params;

        try {
            return http.post('/files/upd', data).then(res => {
                if (res.code) throw new Error(res.msg);
                return data;
            }).catch(err => {
                toast.error(err.message);
            });
        } catch (err) {
            toast.error(err.message);
        }
    },
    async [TYPE_DEL](ctx) {
        try {
            return http.post('/files/del', ctx.params).then(res => {
                if (res.code) throw new Error(res.msg);
                return res;
            }).catch(err => {
                toast.error(err.message);
            });
        } catch (err) {
            toast.error(err.message);
        }
    }
};
const models = {
    detail(data) {
        try {
            return http.get('/files/det', data).then(res => {
                if (res.code) throw new Error(res.msg);
                return res;
            }).catch(err => {
                toast.error(err.message);
            });
        } catch (err) {
            toast.error(err.message);
        }
    }
};
const getFiles = (params, callback) => ({
    type: TYPE_GET,
    params,
    callback
});
const setFiles = (isAdd, params) => ({
    type: isAdd ? TYPE_ADD : TYPE_UPD,
    params
});
const delFiles = params => ({
    type: TYPE_DEL,
    params
});
const setActivate = payload => ({
    type: TYPE_ACTIVATE,
    payload,
});
const addEditFiles = payload => ({
    type: TYPE_EDITED_ADD,
    payload,
});
const setEditFiles = payload => ({
    type: TYPE_EDITED_UPD,
    payload
});
const delEditFiles = payload => ({
    type: TYPE_EDITED_DEL,
    payload
});
const onVisible = payload => ({
    type: TYPE_NEW_VISIBLE,
    payload
});
const onDelVisible = () => ({
    type: TYPE_DEL_VISIBLE
});
const onSaveVisible = () => ({
    type: TYPE_SAVE_VISIBLE
});
export {
    reducer as default,
    middleware,
    models,
    getFiles,
    setFiles,
    delFiles,
    setActivate,
    addEditFiles,
    setEditFiles,
    delEditFiles,
    onVisible,
    onDelVisible,
    onSaveVisible
}