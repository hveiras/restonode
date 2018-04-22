var models  = require('../models');
var express = require('express');
const Sequelize = require('sequelize');
var router  = express.Router();

const Op = Sequelize.Op;

router.route('/restaurant')
  .get(async (req, res, next) => {
    const restaurants = await models.Restaurant.findAll();
    
    return res.status(200).send(restaurants);
  });

router.route('/restaurant/:restaurantId/rating')
  .post(async (req, res, next) => {
    const rating = Object.assign(req.body, { RestaurantId: req.params.restaurantId});
    console.log(rating);
    const created = await models.Rating.create(req.body);
    
    return res.status(201).send(created);
  });

router.route('/restaurant/:restaurantId/rating/gte/:rating')
  .get(async (req, res, nect) => {
    const restaurants = await models.Restaurant.findAll({
      include: [{
        model: models.Rating,
        where: {
          value: { [Op.gte]: parseInt(req.params.rating) }
        }
      }]
    });

    return res.status(200).send(restaurants);
  });

module.exports = router;
