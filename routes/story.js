const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isLoggedIn, isNotLoggedIn, upload } = require('./middlewares');

const { setUserCareer, getUserCareer } = require('../modules/user_modules');
const { setOpenAge, setIntroComment, getOpenAge, getIntroComment,getProfileImage } = require('../modules/info_modules');
const { setStory, getStory } = require('../modules/story_modules');
const { setDevField, getDevField, setDevLang, getDevLang, setSpeField, getSpeField } = require('../modules/port_modules');
const { getCareerDetail } = require('../modules/career_modules');
const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
    res.render('portfolio_userstory', {
        user: req.user,
    });
});

router.post('/exp', isLoggedIn, (req, res, next) => {
    setStory(req.body.project_name, req.body.project_info, req.body.project_link, req.body.url);
    res.redirect(204, '/story');
});

router.get('/back', isLoggedIn, (req, res, next) => {
    res.redirect(req.session.backURL || '/info')
});

router.post('/submit', isLoggedIn, (req, res, next) => {
    var devFLength;
    var speFLength;
    var devLLength;
    var devF = '';
    var speF = '';
    var devL = '';
    var index;
    var insert;
    /*
    for(var i in req.body.dev_field){
        devF+=(req.body.dev_field[i]+"/");
    }
    for(var i in req.body.spe_field){
        speF+=(req.body.spe_field[i]+"/");
    }
    for(var i in req.body.dev_lang){
        devL+=(req.body.dev_lang[i]+"/");
    }*/
    if (typeof req.body.dev_field === "undefined"){
        devFLength = -1;
    } else {
        devFLength = req.body.dev_field.length;
    }
    if (typeof req.body.spe_field === "undefined"){
        speFLength = -1;
    } else {
        speFLength = req.body.spe_field.length;
    }
    if (typeof req.body.dev_lang === "undefined"){
        devLLength = -1;
    } else {
        devLLength = req.body.dev_lang.length;
    }
    if (devFLength != -1 && Array.isArray(req.body.dev_field)){
        for (index = 0; index < devFLength; index++)
        {
            insert = req.body.dev_field.pop();
            if (insert == 'another'){
                if (index == devFLength-1){
                    devF += req.body.another_devF;
                } else {
                    devF += req.body.another_devF + '/';
                }
            } else {
                if (index == devFLength-1){
                    devF += insert;
                } else {
                    devF += insert + '/';
                }
            }
        }
    } else {
        devF = req.body.dev_field;
    }
    if (speFLength != 1 && Array.isArray(req.body.spe_field)){
        for (index = 0; index < speFLength; index++)
        {
            insert = req.body.spe_field.pop();
            if (insert == 'another'){
                if (index == speFLength-1){
                    speF += req.body.another_speF;
                } else {
                    speF += req.body.another_speF + '/';
                }
            } else {
                if (index == speFLength-1){
                    speF += insert;
                } else {
                    speF += insert + '/';
                }
            }
        }
    } else {
        speF = req.body.spe_field;
    }
    if (devLLength != 1 && Array.isArray(req.body.dev_lang)){
        for (index = 0; index < devLLength; index++)
        {
            insert = req.body.dev_lang.pop();
            if (insert == 'another'){
                if (index == devLLength-1){
                    devL += req.body.another_devL;
                } else {
                    devL += req.body.another_devL + '/';
                }
            } else {
                if (index == devLLength-1){
                    devL += insert;
                } else {
                    devL += insert + '/';
                }
            }
        }
    } else {
        devL = req.body.dev_lang;
    }
    console.log(devF);
    console.log(speF);
    console.log(devL);
    setDevField(devF);
    setSpeField(speF);
    setDevLang(devL);
    if(getOpenAge && getOpenAge==='close' && getProfileImage){
        res.render('portfolio_recommendtemplate', {
            tempSign1: 1,
            user: req.user,
        });
    }else if(getStory[3]){
        res.render('portfolio_recommendtemplate', {
            tempSign2: 2,
            user: req.user,
        });
    }else if(getCareerDetail){
        res.render('portfolio_recommendtemplate', {
            tempSign3: 3,
            user: req.user,
        });
    }else{
        res.render('portfolio_recommendtemplate', {
            tempSign4: 4,
            user: req.user,
        });
    }
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
    res.json({ url: `/img/${req.file.filename}` });
});

module.exports = router;