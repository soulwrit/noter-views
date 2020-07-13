const fs = require('fs-extra');
const builder = require("electron-builder");
const cheerio = require('cheerio');
const resolve = require('./resolve');

module.exports = function built(config) {
    loadEntry();

    const Platform = builder.Platform;
    const resource = [
        {
            from: 'client/resources',
            to: 'dist/resources'
        },
        {
            from: 'client/main.js',
            to: 'dist/main.js'
        },
        {
            from: 'client/package.json',
            to: 'dist/package.json'
        },
        {
            from: 'client/render.js',
            to: 'dist/render.js'
        }
    ];

    // 复制必要的静态资源
    resource.forEach(copy => {
        fs.copySync(resolve(copy.from), resolve(copy.to));
    });
    return new Promise((resolve, reject) => {
        builder.build({
            targets: Platform.WINDOWS.createTarget(),
            config: config
        }).then((result) => resolve(result)).catch(err => reject(err));
    });
}


function loadEntry() {
    // scratch\www\dist\index.html
    const entryFilePath = resolve('dist/index.html');

    if (!fs.existsSync(entryFilePath)) {
        throw new Error('[electron] The appropriate entry file was not found and you may not have packaged the front-end resources');
    }

    const entryContent = fs.readFileSync(entryFilePath);

    const $ = cheerio.load(entryContent);

    $('body').prepend('<script src="./render.js"></script>');

    const newEntryContent = $.html();
    fs.writeFileSync(entryFilePath, newEntryContent)
}