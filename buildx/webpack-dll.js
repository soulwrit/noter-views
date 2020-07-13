const os = require('os');
const webpack = require('webpack');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const pkgJson = require('../package.json');
const utils = require('./utils');
const getSourceLoader = require('./webpack/get-source-loader');
const getStyleLoader = require('./webpack/get-style-loader');
const getOptimization = require('./webpack/get-optimization');

const name = pkgJson.name;

module.exports = {
    cache: true,
    context: utils.resolve(''),
    devtool: utils.isDev ? 'cheap-module-eval-source-map' : false,
    entry: getDllEntry(),
    mode: utils.env,
    module: {
        rules: [
            {
                test: /\.m?js(\?.*)?$/i,
                include: /node_modules/,
                use: ['happypack/loader?id=babel']
            },
            {
                test: /\.(htm|html)(\?.*)?$/i,
                loader: 'ejs-loader'
            },
            ...getStyleLoader(),
            ...getSourceLoader(),

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
    optimization: getOptimization(utils.isDev, true),
    output: {
        path: utils.resolve('dist/lib'),
        filename: '[name].js',
        library: '[name]',
        // libraryTarget: 'window',
        // publicPath: '.'
    },
    recordsInputPath: utils.resolve(`build/lib/${name}-input-records.json`),
    recordsOutputPath: utils.resolve(`build/lib/${name}-output-records.json`),
    resolve: {
        modules: ['node_modules'],
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
        alias: {
            // '@': ''
        }
    },
    plugins: getPlugins()
};

function hump(str) {
    return str.trim().replace(/(\.|-|_|\+|\||\\|\/|\s|=)+\w/g, function (m) {
        return m.slice(-1).toUpperCase();
    });
};

/**
 * get package.json dependencies
 * @param {object} options
 */
function getDllEntry() {
    const OBJ = {};
    const useEntries = [
        'react',
        'react-dom',
        'react-intl',
        'react-redux',
        'prop-types',
        'react-router',
        'react-router-dom',
        'antd',
        'redux',
        'intl'
    ];

    useEntries.forEach(key => {
        OBJ[hump(key)] = [key];
    });

    return OBJ;
}

/**
 * webpack Plugin
 * @param {object} opt
 */
function getPlugins() {
    const plugins = [];
    const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 });
    ['babel', 'css', 'sass'].forEach(id => {
        plugins.push(
            new HappyPack({
                id: id,
                loaders: [
                    {
                        loader: id + '-loader?cacheDirectory=true'
                    }
                ],
                threadPool: happyThreadPool,
                verbose: false
            })
        )
    });

    plugins.push(
        new webpack.DllPlugin({
            context: utils.resolve(''),
            path: utils.resolve('dist/lib/[name].json'),
            name: '[name]'
        })
    )

    if (utils.isProd) {
        utils.gzip && plugins.push(
            new CompressionWebpackPlugin({
                // test: Array.isArray(options.gzipTarget) ?
                //     new RegExp(`\\.${options.gzipTarget.join('|')}$`) :
                //     [],
                asset: '[path].gz',
                algorithm: 'gzip',
                threshold: 10240,
                minRatio: 0.8
            })
        );

        utils.report && utils.isOnlyDll && plugins.push(new BundleAnalyzerPlugin());
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
            filename: 'build/lib/dll-asset.json'
        }));
    }
    return plugins;
}