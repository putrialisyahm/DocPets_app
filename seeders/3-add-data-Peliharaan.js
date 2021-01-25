'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Peliharaans', [{
      userId: 1,
      nama: "Chiro",
      jenis: "kucing",
      gender: "male",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 1,
      nama: "Ichiro",
      jenis: "kucing",
      gender: "female",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      nama: "Yoru",
      jenis: "kucing",
      gender: "male",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      nama: "Asa",
      jenis: "anjing",
      gender: "female",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 3,
      nama: "Aka",
      jenis: "hamster",
      gender: "male",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 3,
      nama: "Aoi",
      jenis: "kucing",
      gender: "female",
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
