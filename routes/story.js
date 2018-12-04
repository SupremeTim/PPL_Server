const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

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
    setStory(req.body.project_name, req.body.project_info, req.body.project_link);
    console.log(getAllStory());
    res.redirect(204, '/story');
});

router.get('/delete', (req,res,next) => {
    const list = getAllStory();
    const item = { name: req.param.project_name, info: req.param.project_info, link: req.param.project_link };
    console.log(item);
    var i;
    for (i = 0; i < list.length; i++)
    {
        if (list[i] == item)
            break;
    }
    console.log(i);
    spliceStory(i);
    console.log(getAllStory());
    res.render(204, '/story'); 
});

router.get('/back', (req,res,next) => {
    res.redirect(req.session.backURL || '/info')
});

router.post('/submit', (req, res, next) => {
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

module.exports = router;