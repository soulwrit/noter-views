const alt_s = (e, cb) => {
    // 保存文件: alt + s/S
    e.altKey && e.keyCode === 83 && cb();
};
const alt_n = (e, cb) => {
    // 新建文件：alt + n/N
    e.altKey && e.keyCode === 78 && cb();
};

export default {
    alt_s,
    alt_n
};