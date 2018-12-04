const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/',  (req, res, next) => {
    res.render('index', {
        user:req.user,
    });
});

router.get('/make', isLoggedIn, (req, res, next) => {
    res.render('portfolio', {
        user:req.user,
    });
});

router.get('/search', (req, res, next) => {
    res.redirect('/search');
});

router.get('/product', isLoggedIn, (req, res, next) => {
    //res.render('',{});
});

router.get('/template',(req,res,next)=>{
    res.render('template1',{});
});

module.exports = router;