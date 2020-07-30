const path = require('path');
const { appPath } = require('./paths');
const resolveApp = relativePath => path.resolve(appPath, 'node_modules/monaco-editor/esm/vs', relativePath);

module.exports = {
    entry: {
        'editor.worker': resolveApp('editor/editor.worker'),
        // 'json.worker': resolveApp('language/json/json.worker'),
        // 'css.worker': resolveApp('language/css/css.worker'),
        // 'html.worker': resolveApp('language/html/html.worker'),
        // 'ts.worker': resolveApp('language/typescript/ts.worker'),
    }
}