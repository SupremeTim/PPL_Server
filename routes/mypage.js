const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, (req, res, next) => {
    res.render('mypage', {
        user: req.user,
    });
});

router.post('/change', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({
            name: req.body.name,
            email: req.body.email,
        }, {
                where: { id: req.user.id },
            });
        return res.render('mypage', {
            user: req.user,
            changeSign: 'ok',
        });
    } catch (error) {
        console.error(error);
        return next('error');
    }
});

module.exports = router;