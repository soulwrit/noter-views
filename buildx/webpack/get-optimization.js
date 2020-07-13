const dev = {
    runtimeChunk: false,
    minimize: false,
    noEmitOnErrors: true,
    splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    }
};

const prod = {
    // runtimeChunk: true,
    sideEffects: true,
    splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
            commons: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    }
};

module.exports = function (isDev, isDll) {
    if (isDev) {
        return dev
    }

    if (isDll) {
        prod.splitChunks = false;
    }
    return prod;
}

