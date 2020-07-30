const actions = Object.create(null);
// 快捷键监听
const listen = e => {
    e.preventDefault();
    if (!e.altKey) return;
    switch (e.keyCode) {
        // 保存文件: alt + s/S
        case 83: actions.saveFile(e); break;

        // 新建文件：alt + n/N
        case 78: actions.createFile(e); break;
        default: break;
    }
    return false;
};
// 快捷键绑定
export const registFastKey = funcs => {
    if (typeof funcs !== 'object' || !funcs) return;
    for (const name in funcs) {
        if (funcs.hasOwnProperty(name)) {
            const action = funcs[name];

            if (typeof action === 'function') {
                actions[name] = action;
            }
        }
    }

    document.addEventListener('keyup', listen, false);
};
// 快捷键解绑
export const unregistFastKey = () => {
    for (const name in actions) {
        actions[name] = null;
        delete actions[name];
    }
    document.removeEventListener('keyup', listen, false);
}; 