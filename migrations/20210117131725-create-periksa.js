'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Periksas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appointmentId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {         // appointment belongsTo User 1:1
          model: 'Appointments',
          key: 'id'
        }
      },
      peliharaanId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {         // appointment belongsTo User 1:1
          model: 'Peliharaans',
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
    await queryInterface.dropTable('Periksas');
  }
};