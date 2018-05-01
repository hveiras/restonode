'use strict';

module.exports = (sequelize, dataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: dataTypes.STRING,
    latLng: dataTypes.STRING
  });

  Restaurant.associate = models => {
    models.Restaurant.hasMany(models.Rating);
  };

  return Restaurant;
};
