'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    body: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    topicId: {
    	type: DataTypes.INTEGER,
    	allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.Topics, {
       foreignKey: "topicId",
       onDelete: "CASCADE",
    });

    Post.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Post.hasMany(models.Comment, {
     foreignKey: "postId",
     as: "comments"
     });

    Post.hasMany(models.Vote, {
      foreignKey: "postId",
      as: "votes"
    });
  };
  Post.prototype.getPoints = function(){

     if(this.votes.length === 0) return 0

     return this.votes
       .map((v) => { return v.value })
       .reduce((prev, next) => { return prev + next });
   };

    Post.prototype.hasUpvoteFor = function(userId) {
      const foundUpvote = this.votes.filter((vote) => {
        return ((vote.value === 1) && (vote.userId === userId)) 
      });
      return foundUpvote.length === 1;    
    };

    Post.prototype.hasDownvoteFor = function(userId) {
      const foundDownvote = this.votes.filter((vote) => {
        return ((vote.value === -1) && (vote.userId === userId)) 
      });
      return foundDownvote.length === 1;    
    };
  return Post;
};