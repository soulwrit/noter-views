export const TYPE_DIRECTORY = 1;// 文件夹
export const TYPE_MARKDOWN = 2;  // markdown 文件
export const types = [
    { id: TYPE_DIRECTORY, name: 'folder', type: 'folder', extname: '', icon: '' },
    { id: TYPE_MARKDOWN, name: 'markdown', type: 'markdown', extname: '.md', icon: '' },
];
function isDirectory(type) {
    switch (typeof type) {
        case 'number': return type === TYPE_DIRECTORY;
        case 'object': return type && type.type === TYPE_DIRECTORY;
        default: return false;
    }
}
function isFile(type) {
    switch (typeof type) {
        case 'number': return type > TYPE_DIRECTORY;
        case 'object': return type && type.type > TYPE_DIRECTORY;
        default: return false;
    }
}
function getIcon(file, expanded) {
    switch (file.type) {
        case 1: return expanded ? 'less' : 'more';
        default: return 'form';
    }
}
function getType(typeId) {
    for (let i = 0, lang; i < types.length; i++) {
        lang = types[i];
        if (lang.id === typeId) return lang.type;
    }
    
    return types[1].type;
}
function getPid(file) {
    return file ? isDirectory(file.type) ? file.id : file.pid : void 0;
}
function type(id, key = 'type') {
    for (let i = 0; i < types.length; i++) {
        if (types[i].id === id) return types[i][key];
    }
}
function extname(id) {
    return type(id, 'extname');
}
export default {
    extname,
    getIcon,
    getPid,
    isDirectory,
    isFile,
    types,
    type,
    getType
};