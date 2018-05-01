'use strict';

module.exports = models =>
  async (req, res, next) => {
    const rating = await models.Rating.create(Object.assign(
      req.body,
      { RestaurantId: req.params.restaurantId }
    ));
    
    return res.status(201).send(rating);
  };
