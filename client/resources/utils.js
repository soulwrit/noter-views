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