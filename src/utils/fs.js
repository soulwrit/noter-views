const types = [
    { id: 2, name: 'markdown', type: 'markdown', extname: '.md', icon: '' },
];
function type(id, key = 'type') {
    for (let i = 0; i < types.length; i++) {
        if (types[i].id === id) return types[i][key];
    }
}
function isDirectory(type) {
    return type === 1;
}
function isFile(type) {
    return type > 1;
}
function getIcon(file, status) {
    switch (file.type) {
        case 1: return (status && status.expanded) ? 'less' : 'more';
        default: return 'form';
    }
}
function getPid(file) {
    return file ? isDirectory(file.type) ? file.id : file.pid : undefined;
}
function extname(id) {
    return type(id, 'extname');
}
export default {
    types,
    type,
    isDirectory,
    isFile,
    getIcon,
    getPid,
    extname
}