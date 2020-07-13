const webpack = require('webpack');
const utils = require('../utils');
const statOption = { chunks: false, colors: true };

module.exports = function complie(config, option) {
    if (config.mode !== utils.prod) {
        throw new Error('process.env.NODE_ENV is not production, so System shutdown');
    }
    option = Object.assign({}, statOption, option)

    return complieProcessing(config, option)
}

function complieProcessing(config, option) {

    return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            if (err) {
                reject(failedErrorFormat);
            } else {
                const string = stats.toString(option);
                stats.hasErrors() ? reject(statsErrorsFormat(string)) : resolve(string);
            }
        })
    })
}

// has errors handler
function statsErrorsFormat(string) {
    return string.split(/\r?\n/).map(line => `    ${line}\n`).join('')
}

// complie failed processing
function failedErrorFormat(err) {
    return err.stack || err
}