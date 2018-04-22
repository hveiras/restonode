'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Restaurants', [{
      name: 'La Cabrera',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};