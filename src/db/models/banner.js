'use strict';
module.exports = (sequelize, DataTypes) => {
  var Banner = sequelize.define('Banner', {
    source: DataTypes.STRING,
    description: DataTypes.STRING,
    topicId: {
    	type: DataTypes.INTEGER,
    	onDelete: "CASECADE",
    	references: {
    		model: "Topics",
    		key: "id",
    		as: "topicsId",
    	}
    }
  }, {});
  Banner.associate = function(models) {
    // associations can be defined here
    Banner.belongsTo(models.Topics, {
       foreignKey: "topicsId",
       onDelete: "CASCADE",
     });
  };
  return Banner;
};