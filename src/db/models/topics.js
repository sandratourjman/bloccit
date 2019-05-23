'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topics = sequelize.define('Topics', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  }, {});
  Topics.associate = function(models) {
    // associations can be defined here
    Topics.hasMany(models.Banner, {
    	foreignKey: "topicId",
    	as: "banners",
    });
    Topics.hasMany(models.Rule, {
      foreignKey: "topicId",
      as: "rules",
    });
    Topics.hasMany(models.Post, {
      foreignKey: "topicId",
      as: "posts"
    });
  };
  return Topics;
};