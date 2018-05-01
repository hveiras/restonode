'use strict';

module.exports = (sequelize, dataTypes) => {
  const Rating = sequelize.define('Rating', {
    value: dataTypes.FLOAT
  });

  Rating.associate = models => {
    models.Rating.belongsTo(models.Restaurant, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Rating;
};
