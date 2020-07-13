const chalk = require('chalk');

module.exports = {
  out: console.log,
  key: 'logs',
  log(...args) {
    this.out(`[${chalk.green(this.key + '-info')}]`);
    this.out(...args);
  },
  warn(...args) {
    this.out(`[${chalk.yellow(this.key + '-warn')}]`);
    this.out(...args);
  },
  error(...args) {
    this.out(`[${chalk.red(this.key + '-erro')}]`);
    this.out(...args);
  },
};
