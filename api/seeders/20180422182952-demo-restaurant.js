'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Restaurants', [{
      name: 'La Cabrera',
      latLng: '-34.589058, -58.432863',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};