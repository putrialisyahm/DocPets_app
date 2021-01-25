'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: { // appointment belongsTo User 1:1
          model: 'Users',
          key: 'id'
        }
      },
      dokterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: { // Appointment belongsTo dokter 1:1
          model: 'Users',
          key: 'id'
        }
      },
      klinikId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: { // Appointment belongsTo klinik 1:1
          model: 'Kliniks',
          key: 'id'
        }
      },
      peliharaan: {
        type: Sequelize.INTEGER
      },
      waktu: {
        type: Sequelize.STRING
      },
      diterima: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Appointments');
  }
};