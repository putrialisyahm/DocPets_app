'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Memilikis', [{
      dokterId: 4,
      klinikId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      dokterId: 5,
      klinikId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      dokterId: 4,
      klinikId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      dokterId: 5,
      klinikId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      dokterId: 6,
      klinikId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      dokterId: 6,
      klinikId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
