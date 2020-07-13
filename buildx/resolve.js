const path = require('path');

module.exports = function resolve(dir) {
    return path.join(__dirname, '../', dir);
}