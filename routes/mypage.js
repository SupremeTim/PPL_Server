const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Portfolio } = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const port = await Portfolio.findAll({
            include: {
                model: User,
                where: {
                    id: req.user.id,
                }
            }
        });
        console.log(port);
        return res.render('mypage', {
            results: port,
            user: req.user,
        });

    } catch (error) {
        console.log(error);
        return next('error');
    }
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