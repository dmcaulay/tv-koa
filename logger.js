var config = require('./config');
var winston = require('winston');

winston.clear();
config.logging.label = "tv:" + process.pid;
winston.add(winston.transports.Console, config.logging);

module.exports = function *(next) {
  var start = new Date;
  yield next;
  var end = new Date - start
  winston.info(this.method, this.status, end + 'ms', this.url);
};
