const models  = require('../models');
const express = require('express');
const router  = express.Router();
const asyncMiddleware = require('./asyncMiddleware');

const restaurantRoutes = require('./restaurant')(models);
const mealRoutes = require('./meal')(models);
const orderRoutes = require('./order')(models);

router.route('/restaurant')
  .get(asyncMiddleware(restaurantRoutes.getAll));

router.route('/restaurant/:restaurantId/rating')
  .post(asyncMiddleware(restaurantRoutes.rate));

router.route('/restaurant/:restaurantId/rating/gte/:rating')
  .get(asyncMiddleware(restaurantRoutes.getAllRatedGte));

router.route('/meal')
  .get(asyncMiddleware(mealRoutes.getAll));

router.route('/restaurant/:restaurantId/order')
  .post(asyncMiddleware(orderRoutes.create));

module.exports = router;
