const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const { setUserCareer, getUserCareer } = require('../modules/user_modules');
const { setUserId, getUserId } = require('../modules/port_modules');
const { setOpenAge, setIntroComment, getOpenAge, getIntroComment } = require('../modules/info_modules');
const router = express.Router();

router.get('/', isLoggedIn, (req,res,next) => {
    setUserId(req.user.id);
    res.render('portfolio_basicinfo', {
        user: req.user,
    });
});

router.post('/submit', isLoggedIn, async (req,res,next) => {
    setOpenAge(req.body.age_open);
    setIntroComment(req.body.introduceself);
    setUserCareer(req.body.career)
    console.log(req.body);
    console.log(getOpenAge());
    console.log(getIntroComment());
    console.log(getUserCareer());
    res.render('portfolio_userstory', {
        user: req.user,
    });
});

module.exports = router;