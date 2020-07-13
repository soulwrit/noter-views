// const fs = require('fs-extra');
// const pa = require('path');
// const os = require('os');
// const keyPath = pa.join(os.homedir(), '.ssh/id_rsa.pub');
// const privateKey = fs.readFileSync(keyPath, 'utf8');

const SSH2Utils = require('ssh2-utils');
const logger = require('./logger');
const ssh = new SSH2Utils();
const shx = {
  ssh,
  exit() {
    process.exit(0);
  },
  exec(servers, scripts, callback) {
    if (typeof scripts !== 'string' || scripts === '') {
      throw new Error('Invalid Conmmand.');
    }
    [].concat(servers).forEach(async server => {
      ssh.exec(server, scripts, async (err, stdout, stderr, server, conn) => {
        if (err) throw err;
        logger.log(`${server.username}@${server.host}\n` + stdout);

        if (typeof callback === 'function') {
          await callback(server, conn);
        } else {
          this.exit();
        }
      });
    });
  },

  scp(servers, src, dest, callback) {
    [].concat(servers).forEach(async server => {
      ssh.putDir(server, src, dest, async (err, server, conn) => {
        if (err) throw err;

        if (typeof callback === 'function') {
          await callback(server, conn);
        } else {
          this.exit();
        }
      })
    });
  }
};

module.exports = shx;

