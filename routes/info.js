const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isLoggedIn, isNotLoggedIn, upload } = require('./middlewares');

const { Info, Portfolio } = require('../models');
const { setUserId, getUserId } = require('../modules/port_modules');
const { setOpenAge, setIntroComment, getOpenAge, getIntroComment } = require('../modules/info_modules');
const router = express.Router();

router.get('/', isLoggedIn, (req,res,next) => {
    setUserId(req.user.id);
    console.log(req.body);
    console.log(getUserId());
    res.render('portfolio_basicinfo', {
        user: req.user,
    });
});

router.post('/img', upload.single('img'), (req, res) => {
    res.json({ url: `/img/${req.file.filename}` });
});                             // 이미지 등록 버튼 누를 시, url만 넘길테니 이미지 출력은 프론트에서?

router.post('/submit', isLoggedIn, async (req,res,next) => {
    setOpenAge(req.body.age_open);
    setIntroComment(req.body.introduceself);
    console.log(req.body);
    console.log(getOpenAge());
    console.log(getIntroComment());
    res.render('portfolio_userstory', {
        user: req.user,
    });
});

module.exports = router;