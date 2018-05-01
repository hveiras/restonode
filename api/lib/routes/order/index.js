'use strict';

module.exports = models => ({
  create: require('./createOrder')(models)
});
