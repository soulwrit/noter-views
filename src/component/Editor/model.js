import { toast } from '@writ/react';
import { http } from '@writ/utils/request-fetch';

/**
 * 获取文件详情
 * @param {object} param 
 */
export const getFileDetail = param => { 
    try {
        return http.get('/files/det', param).then(res => {
            if (res.code) throw new Error(res.msg);
            return res;
        }).catch(err => {
            toast.error(err.message);
        });
    } catch (err) {
        toast.error(err.message);
    }
}

/**
 * 获取文件列表
 * @param {object} param 
 */
export const getFiles = param => {
    try {
        return http.get('/files', param).then(res => {
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
}

/**
 * 创建文件
 * @param {object} data 
 */
export const createFile = data => {
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
}

/**
 * 更新文件
 * @param {object} data 
 */
export const updateFile = data => {
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
}

/**
 * 文件删除
 * @param {object} data 
 */
export const deleteFile = data => {
    try {
        return http.post('/files/del', data).then(res => {
            if (res.code) throw new Error(res.msg);
            return data;
        }).catch(err => {
            toast.error(err.message);
        });
    } catch (err) {
        toast.error(err.message);
    }
}