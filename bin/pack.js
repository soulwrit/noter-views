const pa = require('path');
const gb = require('glob');
const fs = require('fs-extra');
const sh = require('shelljs');

/**
 * transform src code
 * @param {object} options
 * @param {string} options.name      ->  App name
 * @param {string} options.pattern   ->  pacject src code directory
 * @param {string} options.release   ->  pacject src code tranform of babel --out-dir
 * @param {object} options.pkgJson   ->  pacject dependencies list
 * @param {object} options.pm2opts   ->  pm2 config
 * @param {object} options.ignore    ->  copy server code of ignore
 * @param {object} options.resource  ->  websit resource
 */
function generate(options) {
  const { pkgJson, pm2opts, name, release, resource } = options;
  const server = gb.sync('./server/*', { dot: true });
  const ignore = ['node_modules', 'package.json', 'pm2opts.json'];
  const target = release || './release';
  const source = resource || './dist';

  server.forEach(pathes => {
    const parsed = pa.parse(pathes)
    const basename = parsed.name;
    const extname = parsed.ext;

    if (ignore.includes(basename)) {
      return;
    }
    fs.copySync(pathes, `${target}/${basename}${extname}`);
  });

  delete pkgJson.devDependencies;
  pm2opts.name = name;
  pkgJson.name = name;
  pkgJson.scripts = {
    start: 'set NODE_ENV=production && pm2 start ./pm2opts.json'
  };
  fs.writeJSONSync(`${target}/package.json`, pkgJson);
  fs.writeJSONSync(`${target}/pm2opts.json`, pm2opts);
  sh.exec('npm run build --only-web');
  fs.copySync(source, `${target}/static`);
}

module.exports = generate;