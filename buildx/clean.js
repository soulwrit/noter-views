const fs = require('fs-extra');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const resolve = require('./resolve');

const cleans = ['./dist'];
const copies = [
  {
    from: 'node_modules/antd/dist/antd.min.css.map',
    to: 'dist/css/antd.min.css.map'
  }, {
    from: 'node_modules/antd/dist/antd.min.css',
    to: 'dist/css/antd.min.css'
  }, {
    from: 'src/assets',
    to: 'dist/'
  }, {
    from: 'packages/scratch-gui/dist/static',
    to: 'dist/static'
  }
];

try {
  cleans.forEach(dir => {
    const dirpath = resolve(dir);

    rimraf.sync(dirpath);
    mkdirp.sync(dirpath);
  });

  copies.forEach(copy => {
    fs.copySync(resolve(copy.from), resolve(copy.to));
  });
} catch (error) {
  error.name = '[PSCleanError]';
  throw error
} 