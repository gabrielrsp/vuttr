'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tools', {
      id: {
        type: Sequelize.INTEGER,
        AllowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        AllowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        AllowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        AllowNull: true,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        AllowNull: true,
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
    return queryInterface.dropTable('tools');

  }
};
