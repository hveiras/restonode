'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('Meals', [{
      name: 'Ojo de Bife',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Bife de Chorizo',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Meals', null, {});
  }
};