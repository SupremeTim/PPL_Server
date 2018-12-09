const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isLoggedIn, isNotLoggedIn, upload } = require('./middlewares');

const { setUserCareer, getUserCareer } = require('../modules/user_modules');
const { setUserId, getUserId } = require('../modules/port_modules');
const { setCareerDetail, getCareerDetail } = require('../modules/career_modules');
const { setOpenAge, setIntroComment, getOpenAge, getIntroComment, setProfileImage, getProfileImage } = require('../modules/info_modules');
const router = express.Router();

router.get('/', isLoggedIn, (req, res, next) => {
    setUserId(req.user.id);
    res.render('portfolio_basicinfo', {
        user: req.user,
    });
});


router.post('/submit', isLoggedIn, async (req, res, next) => {
    setOpenAge(req.body.age_open);
    setIntroComment(req.body.introduceself);
    setUserCareer(req.body.career)
    setProfileImage(req.body.url);
    if(getUserCareer()==1) setCareerDetail(req.body.com_name, req.body.com_term, req.body.com_comment);
    res.render('portfolio_userstory', {
        user: req.user,
    });
});

//----------이미지 업로드 라우터-------
fs.readdir('uploads', (error) => {
    if (error) {
        console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
        fs.mkdirSync('uploads');
    }
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
});

module.exports = router;