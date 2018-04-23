const models  = require('../models');
const express = require('express');
const Sequelize = require('sequelize');
const amqplib = require('amqplib');
const config = require('config');
const router  = express.Router();

const Op = Sequelize.Op;

router.route('/restaurant')
  .get(async (req, res, next) => {
    const restaurants = await models.Restaurant.findAll();
    
    return res.status(200).send(restaurants);
  });

router.route('/restaurant/:restaurantId/rating')
  .post(async (req, res, next) => {
    const rating = await models.Rating.create(Object.assign(
      req.body,
      { RestaurantId: req.params.restaurantId }
    ));
    
    return res.status(201).send(rating);
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

router.route('/meal')
  .get(async (req, res, next) => {
    const meals = await models.Meal.findAll();

    return res.status(200).send(meals);
  })

router.route('/restaurant/:restaurantId/order')
  .post(async (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    const restaurant = await models.Restaurant.findOne({ where: { id: restaurantId } });
    if (!restaurant) throw Error.http(400, `Restaurant with id ${restaurantId} does not exist.`);

    const model = req.body;
    const order = await models.Order.create(model);
    order.setMeals(req.body.meals);

    const orderData = order.get({ plain: true });
    orderData.eta = await models.Order.calculateEta(restaurant.latLng, req.body.latLng);

    const conn= await amqplib.connect(config.rabbitmq);
    const ch = await conn.createChannel();
    const payload = Buffer.from(JSON.stringify(orderData));

    await ch.sendToQueue('orders', payload);
    await ch.sendToQueue('notifications', payload);
    
    return res.status(201).send(orderData);
  });

module.exports = router;
