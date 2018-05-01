'use strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = models =>
  async (req, res, nect) => {
    const restaurants = await models.Restaurant.findAll({
      include: [{
        model: models.Rating,
        where: {
          value: { [Op.gte]: parseInt(req.params.rating) }
        }
      }]
    });

    return res.status(200).send(restaurants);
  };
