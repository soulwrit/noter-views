const miniCssExtractPlugin = require('mini-css-extract-plugin');
// PostCss
const autoprefixer = require('autoprefixer');
const postcssVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');

const utils = require('../utils');

/**
 * webpack style handler Loader
 * @param {object} options
 */
module.exports = function getStyleLoader() {
    const
        source = {
            // css: 'css',
            // less: 'less',
            sass: 's(a|c)ss',
            stylus: 'styl(us)?'
        };

    return Object.keys(source).map(idx => {
        const loader = {
            loader: 'happypack/loader?id=css'
        };
        const loaders = [loader];

        if (idx !== 'css') {
            loaders.push({
                loader: idx + '-loader',
                options: {
                    sourceMap: utils.isDev
                }
            });
        }

        if (utils.isProd) {
            loaders.unshift(miniCssExtractPlugin.loader);
        } else {
            loaders.unshift('style-loader');
        }

        return {
            test: new RegExp(`\\.${source[idx]}(\\?.*)?$`, 'i'),
            use: loaders
        };
    }).concat({
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
        }, {
            loader: 'css-loader',
            options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64:5]',
                camelCase: true
            }
        }, {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: function () {
                    return [
                        postcssImport,
                        postcssVars,
                        autoprefixer({
                            browsers: ['last 3 versions', 'Safari >= 8', 'iOS >= 8']
                        })
                    ];
                }
            }
        }]
    })
}

