'use strict';

module.exports = models => ({
  getAll: require('./getAllMeals')(models)
});
