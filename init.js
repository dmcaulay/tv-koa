var logger = require('./logger');

module.exports = function(app) {
  // x-response-time
  app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
  });

  // logger
  app.use(logger);
};
