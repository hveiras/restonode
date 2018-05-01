'use strict';

module.exports = models => ({
  getAll: require('./getAllRestaurants')(models),
  rate: require('./rateRestaurant')(models),
  getAllRatedGte: require('./getRestaurantsRatedGte')(models)
});
