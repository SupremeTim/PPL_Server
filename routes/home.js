const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/',  (req, res, next) => {
    res.render('index', {
        //name:req.user.name,
    });
});

router.get('/make', isLoggedIn, (req, res, next) => {
    res.redirect('/info');
});

router.get('/search', (req, res, next) => {
    res.redirect('/search');
});

router.get('/product', isLoggedIn, (req, res, next) => {
    //res.render('',{});
});

module.exports = router;