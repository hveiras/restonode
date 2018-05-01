'use strict';

module.exports = models =>
  async (req, res, next) => {
    const meals = await models.Meal.findAll();

    return res.status(200).send(meals);
  };
