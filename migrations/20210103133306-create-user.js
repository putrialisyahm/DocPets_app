'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // It will create users table
    await queryInterface.createTable('users', {
      // id column
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // email column
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      // password column
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      // role column
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      // createdAt column
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // updatedAt column
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // deletedAt column
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users'); // It will drop users table
  }
};
