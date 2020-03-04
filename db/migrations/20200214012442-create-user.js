'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.DATE
      },
      content: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      a:{
        type:Sequelize.INTEGER(1)
      },
      b:{
        type:Sequelize.INTEGER(1)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};