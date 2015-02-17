var _ = require('underscore');

if (!process.env.NODE_ENV) { process.env.NODE_ENV = 'development'; }

var config = require('./' + process.env.NODE_ENV);

var deepExtend = function(target, source) {
  Object.keys(source).forEach(function(key) {
    if ((key in target) && _.isObject(source[key]) && !_.isArray(source[key])) {
      deepExtend(target[key], source[key]);
    } else {
      target[key] = source[key]
    }
  });
  return target;
}

module.exports = deepExtend(require('./default'), config);
