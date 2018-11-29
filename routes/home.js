const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', isLoggedIn, (req, res, next) => {
    res.render('', {});
});

router.get('/', isNotLoggedIn, (req, res, next) => {
    res.render('', {});
});

router.get('/make', isLoggedIn, (req, res, next) => {
    res.redirect('/info');
});

router.get('/search', (req, res, next) => {
    //res.redirect('');
});

router.get('/product', isLoggedIn, (req, res, next) => {
    //res.render('',{});
});

module.exports = router;