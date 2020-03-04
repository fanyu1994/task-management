'use strict';
module.exports = (sequelize, DataTypes) => {
  const Info = sequelize.define('Info', {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
  	timestamps:false
  });
  Info.associate = function(models) {
    // associations can be defined here
  };
  return Info;
};