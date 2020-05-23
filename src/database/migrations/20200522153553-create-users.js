'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        AllowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        AllowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        AllowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        AllowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        AllowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        AllowNull: false,
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  }
};
