'use strict';

const amqplib = require('amqplib');
const config = require('config');

module.exports = models =>
  async (req, res, next) => {
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
  };
