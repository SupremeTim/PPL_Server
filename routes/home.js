const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        user: req.user,
    });
});

router.get('/make', isLoggedIn, (req, res, next) => {
    res.render('portfolio', {
        user: req.user,
    });
});

router.get('/search', (req, res, next) => {
    res.render('searchpage',{
        user:req.user,
    });
});

router.get('/product', isLoggedIn, (req, res, next) => {
    res.render('product', {
        user: req.user,
    });
});

router.post('/product/:id', isLoggedIn, async (req, res, next) => {
    try {
        const { product } = await User.find({
            attributes: ['product'],
            where: { id: req.user.id },
        });
        await User.update({
            product: req.params.id,
        }, {
                where: { id: req.user.id },
            });
        if(product==0){
            return res.render('portfolio_basicinfo', {
                user: req.user,
                productSign: 'ok',
            });
        }else{
            return res.render('index', {
                user: req.user,
                productSign: 'ok',
            });
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }

    
});

router.get('/template', (req, res, next) => {
    res.render('template1', {});
});

module.exports = router;