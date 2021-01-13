'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Memilikis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      klinikId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Kliniks',
          key: 'id'
        }
      },
      dokterId: {
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
    await queryInterface.dropTable('Memilikis');
  }
};