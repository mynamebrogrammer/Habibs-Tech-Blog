const router = require('express').Router();
const {Posts} = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Posts.findAll({
            include: [{model: User}]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Posts.findByPk(req.params.id, {
            include: [{model: User}]
        });
        if (!postData) {
            res.status(404).json({message: 'No post found with this id!'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Posts.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Posts.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (!postData) {
            res.status(404).json({message: 'No post found with this id!'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Posts.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!postData) {
            res.status(404).json({message: 'No post found with this id!'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});     

module.exports = router;