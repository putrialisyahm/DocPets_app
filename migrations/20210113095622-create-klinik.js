'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Kliniks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      lokasi: {
        type: Sequelize.STRING
      },
      tentang: {
        type: Sequelize.STRING
      },
      fasilitas: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },
      dokter: {
        type: Sequelize.INTEGER
      },
      adminId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {         // Peliharaan belongsTo User 1:1
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Kliniks');
  }
};