const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isLoggedIn, isNotLoggedIn,upload } = require('./middlewares');

const { setUserCareer, getUserCareer } = require('../modules/user_modules');
const { setOpenAge, setIntroComment, getOpenAge, getIntroComment } = require('../modules/info_modules');
const { setStory, getStory, spliceStory, getAllStory } = require('../modules/story_modules');
const { setDevField, getDevField, setDevLang, getDevLang, setSpeField, getSpeField } = require('../modules/port_modules');
const router = express.Router();

router.get('/', isLoggedIn, async(req, res, next) => {
    res.render('portfolio_userstory', {
        user: req.user,
    });
});

router.post('/exp', (req, res, next) => {
    setStory(req.body.project_name, req.body.project_info, req.body.project_link, req.body.url);
    console.log(getAllStory());
    res.redirect(204, '/story');
});

router.post('/delete', (req,res,next) => {
    console.log(getAllStory());
    spliceStory(req.body.project_index);
    res.redirect(204, '/story'); 
});

router.get('/back', (req,res,next) => {
    res.redirect(req.session.backURL || '/info')
});

router.post('/submit', (req, res, next) => {
    console.log(req.body);
    setDevField(req.body.dev_field);
    setSpeField(req.body.spe_field);
    setDevLang(req.body.dev_lang);
    console.log(getDevField());
    console.log(getSpeField());
    console.log(getDevLang());
    res.render('portfolio_recommendtemplate', {
        user: req.uesr,
    });
});

//----------이미지 업로드-------------
fs.readdir('uploads', (error) => {
    if (error) {
        console.log('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
        fs.mkdirSync('uploads');
    }
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}`});
});

module.exports = router;