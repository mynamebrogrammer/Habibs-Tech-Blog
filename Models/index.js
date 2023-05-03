const User = require('./User');
const Post = require('./posts');
const Comment = require('./comments');

//Associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'cascade'
});

module.exports = { User, Post, Comment };