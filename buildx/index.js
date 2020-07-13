/**
 * @desc APP Bulid Step
 *
 * @desc Step 1: Determine if it is a build environment [判断是否为构建环境]
 * @desc Step 2: Clean up the history resource bundle [清理历史资源包]
 * @desc Step 3: Package the common file package [处理共有文件包]
 * @desc Step 4: Use webpack to package view resources [使用webpack打包视图资源]
 * @desc Step 5: Build the output client package [构建输出客户端程序包]
 */
const utils = require('./utils');
const { logger } = utils;

// step 1
if (utils.isProd) { 

    // step 2
    require('./clean');

    // step 3
    const webpack = require('./webpack');
    if (!utils.isOnlyClean) {
        const webpackDll = require('./webpack-dll');
        webpack(webpackDll).then(stat => {
            logger.out(stat);
            logger.info('[webpack] Dll\'s resource processing successful.\n');

            // step 4
            if (!utils.isOnlyDll) {
                const webpackMain = require('./webpack-main');
                webpack(webpackMain).then(stat => {
                    logger.out(stat);
                    logger.info('[webpack] Web\'s resource processing successful.\n');

                    // step 5
                    if (!utils.isOnlyWeb && utils.client) {
                        const builder = require('./builder');
                        const config = require('./builder-config');

                        builder(config).then(res => {
                            logger.info('[electron] Client\'s resource processing successful.\n');
                            logger.info('APP_PATH', res.join('\n'));
                        }).catch(err => {
                            logger.error(err);
                        });
                    }
                }).catch(err => {
                    logger.error(err);
                });
            }
        }).catch(err => {
            logger.error(err);
        });
    }
} else {
    throw new Error('The packager can only run in a production environment.')
}