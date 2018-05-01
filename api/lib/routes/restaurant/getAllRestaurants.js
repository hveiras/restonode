'use strict';

module.exports = models =>
  async (req, res, next) => {
    const restaurants = await models.Restaurant.findAll();
    return res.status(200).send(restaurants);
  };
