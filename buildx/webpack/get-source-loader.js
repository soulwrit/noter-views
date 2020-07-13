/**
 * Rules for handling font files, images, media resources, etc
 * @param {object} options
 */
module.exports = function getSourceLoader() {
    const source = {
        image: ['png', 'jpeg', 'jpg', 'gif'],
        media: ['mp4', 'webm', 'ogg', 'mp3', 'wav', 'flac', 'aac'],
        fonts: ['woff', 'woff2', 'eot', 'ttf', 'otf']
    };

    return Object.keys(source).map(function (name) {
        const reg = Array.from(new Set(source[name])).join('|');

        return {
            test: new RegExp(`\\.(${reg})(\\?.*)?$`, 'i'),
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: `${name}/[name].[hash:6].[ext]`
                }
            }]
        };
    });
}