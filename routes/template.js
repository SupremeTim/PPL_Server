const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const{setTemplateNum}=require('../modules/user_modules');
const router = express.Router();

router.get('/', isLoggedIn, (req, res, next) => {
    res.render('portfolio_recommendtemplate', {
        user: req.user,
    });
});

router.post('/template1', (req, res, next) => {
    res.redirect('template1');
});

router.get('/back', isLoggedIn, (req, res, next) => {
    res.redirect(req.session.backURL || '/story')
});
/*
router.post('/submit', isLoggedIn, (req, res, next) => {
    res.render('portfolio_create', {
        user: req.user,
    });
});*/

router.get('/select', isLoggedIn, (req, res, next) => {
    res.render('selecttemplatepage', {
        user: req.user,
    });
});

router.get('/select/:id', isLoggedIn, (req, res, next) => {
    setTemplateNum(req.params.id);
    res.render('portfolio_create', {
        user: req.user,
        templateNum:req.params.id,
    });
});

module.exports = router;