const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Portfolio, Project_experience, Dev_field, Dev_Lang, Spe_Field } = require('../models');
const { isLoggedIn, isNotLoggedIn, upload } = require('./middlewares');
const { setStory, getStory, getAllStory } = require('../modules/story_modules');
const { setDevField, getDevField, setDevLang, getDevLang, setSpeField, getSpeField } = require('../modules/port_modules');
const router = express.Router();

router.get('/', isLoggedIn, async(req, res, next) => {
    console.log(getAllStory());
    console.log(getDevField());
    console.log(getDevLang());
    console.log(getSpeField());
    res.render('portfolio_userstory', {
        user: req.user,
    });
});

router.post('/exp', (req, res, next) => {
    setStory(req.body.project_name, req.body.project_info, req.body.project_link);
    req.flash('story save', '프로젝트 저장 성공');
    res.redirect(204, '/story');
});

router.get('/delete', (req,res,next) => {
    console.log(document.getElementById('field'));
    res.redirect(204, '/story');
});

router.post('/submit', (req, res, next) => {
    console.log(req.body.dev_field);
    setDevField(req.body.dev_field);
    console.log(req.body.spe_field);
    setSpeField(req.body.spe_field);
    console.log(req.body.dev_lang);
    setDevLang(req.body.dev_lang);
    res.redirect(204, '/story');
});

module.exports = router;