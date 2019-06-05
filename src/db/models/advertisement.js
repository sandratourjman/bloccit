'use strict';
module.exports = (sequelize, DataTypes) => {
  var Advertisements = sequelize.define('Advertisements', {
    title: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    description: {
    	type: DataTypes.STRING,
    	allowNull: false
    }
  }, {});
  Advertisements.associate = function(models) {
    // associations can be defined here
  };
  return Advertisements;
};