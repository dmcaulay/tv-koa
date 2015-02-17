require('dotenv').load();

var config = require('./config');
var koa = require('koa');
var winston = require('winston');

var app = koa();

require('./init')(app);

// router
app.use(function *(){
  this.body = 'Hello World';
});

// start app
app.listen(config.port, function() {
  winston.info('tv started on port', config.port);
});
