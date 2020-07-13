const pkg = require('../package.json');
const utils = require('./utils');

module.exports = {
    APP_VERSION: JSON.stringify(pkg.version),
    APP_AUTHOR: JSON.stringify(pkg.author),
    APP_NAME: JSON.stringify(pkg.name),
    APP_ENV: JSON.stringify(utils.env),
    APP_MODE: JSON.stringify(utils.client ? 'desktop' : 'browser'),
    APP_PLATFORM: JSON.stringify('win')
}