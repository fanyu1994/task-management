'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    deadline: DataTypes.DATE,
    content: DataTypes.STRING,
    status: {
      type:DataTypes.INTEGER,
      defaultValue:1
    },
    a: {
      type:DataTypes.INTEGER,
      defaultValue:2
    },
    b: {
      type:DataTypes.INTEGER,
      defaultValue:0
    }
  }, {
    timestamps: false
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};