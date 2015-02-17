var _ = require('underscore');

var required = [ 'TV_PORT' ];
required.forEach(function(r) {
  if (process.env[r] === undefined) throw (r + " is not defined");
});

module.exports = {
  port: process.env.TV_PORT,
  logging: {
    level: 'info',
    levels: {
      debug: 0,
      stats: 1,
      info: 2,
      error: 3
    },
    colors: {
      stats: 'yellow'
    },
    colorize: true,
    timestamp: true
  }
};
