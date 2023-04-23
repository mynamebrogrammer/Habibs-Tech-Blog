const router = require('express').Router();
const { User, Posts } = require('../../models');
const withAuth = require('../../utils/auth');

// we want to get the specific user and their posts, assuming that the user is logged in
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.session.user_id,
            },
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Posts,
                    attributes: ['id', 'title', 'post_text', 'date_created'],
                },
            ],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// we want to update the user's profile, assuming that the user is logged in
router.put('/', withAuth, async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.session.user_id,
            },
        });

        if (!userData[0]) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// we want to delete the user's profile, assuming that the user is logged in
router.delete('/', withAuth, async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.session.user_id,
            },
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', withAuth, async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});



module.exports = router;