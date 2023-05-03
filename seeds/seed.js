const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../Models');

const userData = require('./userData.json');
const postData = require('./postsData.json');
const commentsData = require('./commentsData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    
    for (const posts of postData) {
        await Post.create({
        ...posts,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const comments of commentsData) {
        await Comment.create({
        ...comments,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    const posts = await Post.findAll();
    for (const comments of commentsData) {
        await Comment.create({
        ...comments,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        post_id: posts[Math.floor(Math.random() * posts.length)].id,
        });
    }

    
    
    process.exit(0);
    };

seedDatabase();