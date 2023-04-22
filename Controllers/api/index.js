const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const profileRoutes = require('./profileRoute');



router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/profile', profileRoutes);

module.exports = router;