const fs = require('fs');
const os = require('os');
const pa = require('path');

const webpack = require('webpack');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkgJson = require('../package.json');
const VersionPlugin = require('./webpack/version-plugin');
const getSourceLoader = require('./webpack/get-source-loader');
const getStyleLoader = require('./webpack/get-style-loader');
const getOptimization = require('./webpack/get-optimization');
const webpackDllConfig = require('./webpack-dll');
const utils = require('./utils');
const defineVars = require('./define');

const OUTPUT_PATH = utils.resolve('dist');
const name = pkgJson.name;
const entry = {
    index: './src/index.jsx',
    admin: './src/admin.jsx'
};

if (utils.isDev) {
    Object.keys(entry).forEach(key => {
        // 'react-hot-loader/patch', 'webpack-hot-middleware/client?noInfo=true&reload=true',
        entry[key] = [entry[key]];
    });
}

// { browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8'] }
module.exports = {
    cache: true,
    context: utils.resolve(''),
    devtool: utils.isDev ? 'cheap-module-eval-source-map' : false,
    entry,
    mode: utils.env,
    module: {
        noParse: /node_modules\/google-libphonenumber\/dist/,
        rules: [
            {
                test: /\.js(x)?(\?.*)?$/i,
                include: [
                    utils.resolve('src'),
                    // utils.resolve('release/'),
                    /(node_modules)[\\/]scratch-[^\\/]+[\\/]src/
                ],
                use: ['happypack/loader?id=babel']
            },
            {
                test: /\.svg?(\?.*)?$/,
                include: /components(\/|\\+)video(\/|\\+)*/,
                use: ['svg-react-loader']
            },
            {
                test: /\.svg?(\?.*)?$/,
                exclude: /components(\/|\\+)video(\/|\\+)*/,
                use: ['url-loader']
            },
            {
                test: /\.(htm|html)(\?.*)?$/i,
                loader: 'ejs-loader'
            },
            ...getStyleLoader(),
            ...getSourceLoader()
        ]
    },
    name: name,
    node: {
        fs: 'empty',
        child_process: 'empty',
        module: 'empty',
        console: 'empty',
        net: 'empty',
        tls: 'empty',
        console: false
    },
    optimization: getOptimization(utils.isDev),
    output: {
        path: OUTPUT_PATH,
        filename: `js/[name].[hash:6].js`,
        chunkFilename: `js/[id].chunk.[hash:6].js`,
        publicPath: utils.client ? '' : '/'
    },
    recordsInputPath: utils.resolve(`build/lib/${name}-input-records.json`),
    recordsOutputPath: utils.resolve(`build/lib/${name}-output-records.json`),
    resolve: {
        symlinks: false,
        modules: ['./packages', 'node_modules'], // 
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
        alias: {
            '@com': utils.resolve('src/components/')
        }
    },
    plugins: [
        new VersionPlugin({ length: 5 }),
        new CopyWebpackPlugin([{
            from: 'extension-worker.{js,js.map}',
            context: 'node_modules/scratch-vm/dist/web'
        }]),
        new webpack.DefinePlugin(defineVars),
        ...getPlugins(),
    ]
};

/**
 * webpack Plugin
 * @param {object} opt
 */
function getPlugins() {
    const plugins = [];
    const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 });
    ['babel', 'css', 'sass'].forEach(id => {
        const loader = id === 'css' ? id + '-loader?modules' : id + '-loader?cacheDirectory=true';
        plugins.push(
            new HappyPack({
                id: id,
                loaders: [
                    {
                        loader: loader
                    }
                ],
                threadPool: happyThreadPool,
                verbose: false
            })
        );
    });

    plugins.push(new HappyPack({
        id: 'babel',
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
                }
            },
        ],
        verbose: false
    }));

    joinDll(plugins);

    if (utils.isProd) {
        utils.gzip && plugins.push(
            new CompressionWebpackPlugin({
                // test: .
                asset: '[path].gz',
                algorithm: 'gzip',
                threshold: 10240,
                minRatio: 0.8
            })
        );

        utils.report && utils.isOnlyWeb && plugins.push(new BundleAnalyzerPlugin());
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
                chunkFilename: 'css/[id].[hash:6].css'
            }),
            new OptimizeCSSPlugin({
                assetNameRegExp: /\.optimize\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true
                            }
                        }
                    ]
                },
                canPrint: true
            })
        )
    }

    if (utils.isProd) {
        plugins.push(new AssetsWebpackPlugin({
            filename: 'build/lib/main-asset.json'
        }));
    } else {
        // plugins.push(
        //     new webpack.HotModuleReplacementPlugin()
        // );
    }

    return plugins;
}

function joinDll(plugins) {
    const libsRoot = webpackDllConfig.output.path;
    const libsName = pa.parse(libsRoot).name;
    const libEntry = webpackDllConfig.entry;

    const manifest = pa.join(libsRoot, '[name].json');
    const dllsName = libsName + '/[name].[ext]';
    const options = {
        admin: {
            title: 'Imagine, Program, Share, Education - Management background',
            description: 'ProgramSpace',
            viewportWidth: 'device-width',
        },
        index: {
            title: 'Imagine, Program, Share, Education',
            description: 'ProgramSpace',
            viewportWidth: 'device-width',
        }
    };

    Object.keys(entry).forEach(name => {
        const libs = {
            js: [],
            css: []
        };

        Object.keys(libEntry).forEach(lib => {
            const festPath = manifest.replace('[name]', lib);

            if (fs.existsSync(festPath)) {
                plugins.push(
                    new webpack.DllReferencePlugin({
                        context: utils.resolve(''),
                        manifest: festPath
                    })
                );

                for (const key in libs) {
                    const fileBase = dllsName.replace('[name]', lib).replace('[ext]', key);
                    const filePath = pa.join(OUTPUT_PATH, fileBase);

                    if (fs.existsSync(filePath)) {
                        libs[key].push(pa.join(fileBase));
                    }
                }
            }
        });

        const opts = options[name];
        plugins.push(
            new HtmlWebpackPlugin({
                filename: `${name}.html`,
                template: './src/index.ejs',
                chunks: [name],
                library: libs,
                client: utils.client,
                title: opts.title,
                description: opts.description,
                viewportWidth: opts.viewportWidth,
                minify: utils.isProd ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                } : false
            })
        );
    });
}
