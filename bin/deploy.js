const pa = require('path');
const fs = require('fs-extra');
const { EventEmitter } = require('events');
const webpack = require('./bin/pack');
const logger = require('./bin/logger');
const shx = require('./bin/ssh');

function isString(str) {
  return typeof str === 'string' && str.length > 0;
};

/**
 *  pack       : 源码转换
 *  nvm        : nodejs包管理器查看
 *  list       : 列出当前项目根目录下的历史版本
 *  rm         : 删除某一版本的代码
 *  clear      : 清空项目，包括当前版本
 *  install    : 安装某一版本的项目
 *  start      : 启动某一版本
 *  stop       : 停止某一版本
 *  restart    : 重启某一版本
 *  publish    : 同步本地某一版本代码到远程的服务器
 *  rollback   : 版本回滚
 */
class Deploy extends EventEmitter {
  constructor(options) {
    super();
    this.setMaxListeners(0);
    this.options = options;
    const { dest, root, pkgJson } = options;
    const argv = process.argv.slice(2);
    const vers = argv[1];

    this.command = argv[0];
    this.cliArgs = argv.slice(1);

    this.version = 'v' + (isString(vers) ? vers : pkgJson.version);   // 当前项目版本号
    this.appName = pkgJson.name + '-' + this.version;                 // 当前项目的名称
    this.appRoot = pa.posix.join(root, this.version);                 // 当前版本对应的服务端的代码
    this.hocRoot = pa.join(dest, this.version);                       // 当前版本号对应的项目代码
    this.register();
  }

  register() {
    const { root, servers, pm2opts, pkgJson } = this.options;

    // 查看帮助
    this.on('help', () => {
      process.stdout.write(fs.readFileSync('./bin/help.txt'));
    });

    // 查看nvm管理器
    this.on('nvm', callback => {
      shx.exec(servers, 'source ~/.nvm/nvm.sh && nvm list', callback);
    });
    // 列出项目版本详情
    this.on('list', callback => {
      shx.exec(servers, `ls -lah ${root}`, callback);
    });

    // 清空服务端所以版本
    this.on('clear', callback => {
      shx.exec(servers, `rm -rf ${root}/*`, callback);
    });

    // 查看服务端 pm2 运行状态
    this.on('status', callback => {
      shx.exec(servers, `pm2 status`, callback);
    });

    // 删除指定版本的代码
    this.on('rm', callback => {
      const { cliArgs } = this;
      if (!cliArgs.length) {
        return logger.error('Invalid Path');
      }
      const name = cliArgs.join(' ');
      shx.exec(servers, `cd ${root} && rm -rf ${name}`, callback);
    });

    // 安装
    this.on('install', callback => {
      // npm cache clean --force
      const scripts = ['npm config set package-lock false', '&& rm -f package-lock.json', '&& npm install --production'];

      shx.exec(servers, `cd ${this.appRoot} && ${scripts.join(' ')}`, callback);
    });

    // 启动
    this.on('start', callback => {
      shx.exec(servers, `cd ${this.appRoot} && npm start`, callback); // && pm2 save
    });

    // 重启
    this.on('restart', callback => {
      shx.exec(servers, `cd ${this.appRoot} && pm2 restart ${this.appName}`, callback);
    });

    // 停止
    this.on('stop', callback => {
      shx.exec(servers, `cd ${this.appRoot} && pm2 delete ${this.appName}`, callback);
    });

    // 发布
    this.on('publish', callback => {
      const hasHocVersion = !fs.existsSync(this.hocRoot);

      if (!hasHocVersion) {
        this.emit('pack');
      }
      logger.log('Now, start copy project to remote server, please waiting ...');

      shx.scp(servers, this.hocRoot, this.appRoot, () => {
        this.emit('list', () => {
          this.emit('install', () => {
            logger.log('install dependencies successfully.');
            // this.emit('stop', () => {
            // logger.log(`APP(name: ${appName}) stop successfully.`)
            this.emit('start', () => {
              logger.log(`APP(name: ${this.appName}) start successfully.`);
              typeof callback === 'function' && callback();
              process.exit();
            });
            // });
          });
        });
      });
    });

    // 转码
    this.on('pack', callback => {
      webpack({ pkgJson, pm2opts, release: this.hocRoot, name: this.appName });
      typeof callback === 'function' && callback();
    });

    // 回滚
    this.on('rollback', callback => {
      logger.log('Please enter the version number to be rolled back, The following: \n');
      this.emit('list', (server, conn) => {
        shx.ssh.fileExists(server, this.appRoot, (err, exists, _server, conn) => {
          if (err) {
            const msg = `${err.message} ${this.appRoot}`;
            throw new Error(msg);
          }

          if (exists) {
            logger.log(this.appRoot, 'is existed , but 该功能正在开发中 ...');
          }

          typeof callback === 'function' && callback();
          process.exit();
        });
      });
    });
  }

  start() {
    const { command } = this;
    const tasks = this.eventNames();

    if (tasks.includes(command)) {
      return this.emit(command);
    }
    // iptables -A INPUT -p tcp --dport 8063 -j ACCEPT
    // iptables -A OUTPUT -p tcp --sport  8063 -j ACCEPT
    // service iptables save
    // service iptables restart
    // iptables -L -n

    // netstat -nlp
    // netstat -lnp|grep 8063 -> ps pid ->
    logger.warn('Can not find sub command, Commands: ' + tasks.join(', '));
  }
};

void function starter() {
  process.on('unhandledRejection', error => {
    throw error;
  });
  const options = {
    src: './dist',
    dest: './release',
    root: '/data/program/www/',
    servers: [
      { host: '114.116.28.122', username: 'root', password: 'hw_xacxzx2018' }
    ],
    pkgJson: require('./server/package.json.js'),
    pm2opts: require('./server/pm2opts.json.js')
  };
  return new Deploy(options).start();
}();

