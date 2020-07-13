const gitsha = require('git-bundle-sha');

module.exports = class VersionPlugin {
    constructor(options) {
        this.options = options || {};
        return this;
    }
    apply(compiler) {
        const addVersion = function (compilation, versionId, callback) {
            compilation.assets['version.txt'] = {
                source: function () {
                    return versionId;
                },
                size: function () {
                    return versionId.length;
                }
            };
            callback();
        };
        const options = this.options;
        compiler.plugin('emit', function (compilation, callback) {
            const sha = process.env.WWW_VERSION;
            if (!sha) {
                // eslint-disable-line no-negated-condition
                gitsha(options, function (err, _sha) {
                    if (err)
                        return callback(err);
                    return addVersion(compilation, _sha, callback);
                });
            }
            else {
                return addVersion(compilation, sha, callback);
            }
        });
    }
}