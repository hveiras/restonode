'use strict';

const rp = require('request-promise');
const env = process.env.NODE_ENV || 'development';
const config = require('config');


module.exports = (sequelize, dataTypes) => {
  const Order = sequelize.define('Order', {
    cost: dataTypes.FLOAT,
    address: dataTypes.STRING,
    latLng: dataTypes.STRING 
  });

  Order.associate = models => {
    models.Order.belongsToMany(models.Meal, {through: 'OrdersMeals'});
  };

  Order.calculateEta = async (origin, destination) => {
    const res = JSON.parse(await rp(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${config.distanceMatrixApiKey}`));
    const body = res.rows[0].elements[0];
    return res.rows[0].elements[0].duration;
  }

  return Order;
};