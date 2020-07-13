const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const opn = require('opn');
const webpack = require('webpack');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const MemoryFS = require('memory-fs');
const PassThrough = require('stream').PassThrough;

const logger = require('./logger');
const config = require('./webpack-main');
const devServerConfig = require('./config');

const compiler = webpack(config);
const mfs = new MemoryFS();
const app = new Koa();

compiler.outputFileSystem = mfs;
app.use(cors())
app.use(koaStatic(config.output.path));

// Server setup
app.use(logger({
    name: 'DevServer',
    level: 'debug',
    timeLimit: 100,
    headers: ['Accept']
}));

app.use(devMiddleware(compiler, {
    publicPath: '/',
    logLevel: 'silent',
    watchOptions: {
        aggregateTimeout: 500,
        poll: 2500,
        ignored: ['node_modules', 'build']
    }
}));

// app.use(hotMiddleware(compiler, {
//     log: false,
//     path: '/__webpack_hmr',
//     heartbeat: 3000
// }));

app.use(publish);
compiler.hooks.done.tap('done', done);

function done(stat) {
    handleStat(stat);
    if (!done.opened) {
        done.opened = true;
        const port = devServerConfig.DEV_PORT;

        console.log('First Compilation Duration :', stat.endTime - stat.startTime + 'ms');

        app.listen(port, function () {
            console.log('[PS] dev-server listening on port ' + port + '\n');
            opn('http://localhost:' + port)
        });
    }
}

function devMiddleware(compiler, opts) {
    const middleware = webpackDev(compiler, opts);
    return async (ctx, next) => {
        await middleware(ctx.req, {
            end: (content) => {
                ctx.body = content;
            },
            setHeader: (name, value) => {
                ctx.set(name, value);
            }
        }, next);
    };
}

function hotMiddleware(compiler, opts) {
    const middleware = webpackHot(compiler, opts);
    return async (ctx, next) => {
        let stream = new PassThrough();
        ctx.body = stream;
        await middleware(ctx.res, {
            write: stream.write.bind(stream),
            writeHead: (status, headers) => {
                ctx.status = status;
                ctx.set(headers);
            }
        }, next);
    };
};

function handleStat(stat) {
    console.log('\n', stat.toString({
        colors: true,
        emitted: true,
        chunks: false,
        all: false,
        hash: true,
        assets: true,
        warnings: true,
        errors: true,
        errorDetails: true
    }), '\n');
}

function readMemoryFile(paths) {
    return new Promise((resovle) => {
        const filepath = path.join(config.output.path, paths);
        const isExisted = mfs.existsSync(filepath);

        if (!isExisted || paths === '/') {
            return resovle(null);
        }

        try {
            mfs.readFile(filepath, 'utf-8', (err, data) => {
                if (err) {
                    resovle(null)
                } else {
                    resovle(data.toString())
                }
            });
        } catch (error) {
            resovle(null)
        }
    });
}

async function publish(ctx, next) {
    let fileContent = await readMemoryFile(ctx.path);

    // console.log(ctx.path, fileContent);
    if (fileContent) {
        ctx.set('Cache-Control', 'no-cache, no-transform');
        ctx.set('X-Accel-Buffering', 'no');
        ctx.set('Accept-Ranges', 'bytes');
        ctx.set('Connection', 'keep-alive');
        ctx.status = 200;
        ctx.type = path.extname(ctx.path);
        ctx.flushHeaders();
        ctx.body = fileContent;
    } else if (ctx.path !== '/__webpack_hmr') {
        ctx.type = "text/html";
        ctx.body = await readMemoryFile('index.html');
    }

    await next()
}

function cors(options) {
    options = options || {};

    var defaults = {
        origin: true,
        methods: 'GET,HEAD,PUT,POST,DELETE'
    };

    // Set defaults
    for (var key in defaults) {
        if (!options.hasOwnProperty(key)) {
            options[key] = defaults[key];
        }
    }

    // Set expose
    if (Array.isArray(options.expose)) {
        options.expose = options.expose.join(',');
    }

    // Set maxAge
    if (typeof options.maxAge === 'number') {
        options.maxAge = options.maxAge.toString();
    } else {
        options.maxAge = null;
    }

    // Set methods
    if (Array.isArray(options.methods)) {
        options.methods = options.methods.join(',');
    }

    // Set headers
    if (Array.isArray(options.headers)) {
        options.headers = options.headers.join(',');
    }

    return async function fn(ctx, next) {
        var origin;
        if (typeof options.origin === 'string') {
            origin = options.origin;
        } else if (options.origin === true) {
            origin = ctx.get('origin') || '*';
        } else if (options.origin === false) {
            origin = options.origin;
        } else if (typeof options.origin === 'function') {
            origin = options.origin(ctx.request);
        }

        if (origin === false) return;

        ctx.set('Access-Control-Allow-Origin', origin);

        /**
         * Access Control Expose Headers
         */
        if (options.expose) {
            ctx.set('Access-Control-Expose-Headers', options.expose);
        }

        /**
         * Access Control Max Age
         */
        if (options.maxAge) {
            ctx.set('Access-Control-Max-Age', options.maxAge);
        }

        /**
         * Access Control Allow Credentials
         */
        if (options.credentials === true) {
            ctx.set('Access-Control-Allow-Credentials', 'true');
        }

        /**
         * Access Control Allow Methods
         */
        ctx.set('Access-Control-Allow-Methods', options.methods);

        /**
         * Access Control Allow Headers
         */
        var headers;

        if (options.headers) {
            headers = options.headers;
        } else {
            headers = ctx.get('access-control-request-headers');
        }

        if (headers) {
            ctx.set('Access-Control-Allow-Headers', headers);
        }

        /**
         * Returns
         */
        if (ctx.method === 'OPTIONS') {
            ctx.status = 204;
        } else {
            await next();
        }
    };
};