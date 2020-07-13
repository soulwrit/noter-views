// Dev Logo
exports.dev = 'development';

// Prod Logo
exports.prod = 'production';

// Current environment variable
exports.env = String(process.env.NODE_ENV || exports.dev).trim();

// Whether it is a development environment
exports.isDev = exports.env === exports.dev;

// Whether it is a production environment
exports.isProd = exports.env === exports.prod;

// Whether use gzip
exports.gzip = process.argv.includes('--gzip');

// Whether or if Open report
exports.report = process.argv.includes('--report');

// Whetyer of if Client
exports.client = process.argv.includes('--client');

// build only dll
exports.isOnlyDll = process.argv.includes('--only-dll');

// building only web
exports.isOnlyWeb = process.argv.includes('--only-web');

// building only clean
exports.isOnlyClean = process.argv.includes('--only-clean');

// utils --------------------------
const pa = require('path')
exports.resolve = function resolve(path) {
    return pa.join(__dirname, '../', path)
}

// logger for develop
const chalk = require('chalk');
exports.logger = {
    out(...args) {
        console.log(...args)
    },

    info(...args) {
        this.out(chalk.green('PS-INFO', ...args));
    },

    error(...args) {
        this.out(chalk.red('PS-ERRS', ...args));
    },

    debug(...args) {
        this.out(chalk.blue('PS-BUGS', ...args));
    }
}