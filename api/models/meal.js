'use strict';

module.exports = (sequelize, dataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: dataTypes.STRING
  });

  Meal.associate = models => {
    models.Meal.belongsToMany(models.Order, {through: 'OrderMeal'});
  };

  return Meal;
};