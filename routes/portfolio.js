const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const { setPortId, getPortId, setPortView, getPortView,
    getDevField, getDevLang, getSpeField, getUserId } = require('../modules/port_modules');
const { getUserCareer, getTemplateNum } = require('../modules/user_modules');
const { getStory, getStoryName, getStoryInfo, getStoryLink, getStoryUrl } = require('../modules/story_modules');
const { getOpenAge, getIntroComment, getProfileImage } = require('../modules/info_modules');
const { getCareerDetail, getCareerName, getCareerTerm, getCareerComment } = require('../modules/career_modules');

const { User, Portfolio, Project_Experience, Info, Career_Detail } = require('../models');

const router = express.Router();

router.get('/', isLoggedIn, (req, res, next) => {
    res.render('portfolio_create', {
        user: req.user,
    });
});

router.post('/submit', isLoggedIn, async (req, res, next) => {
    try {
        await User.update({
            career: getUserCareer(),
        }, {
                where: { id: req.user.id },
            });
        await Portfolio.create({
            port_views: 0,
            port_name: req.body.port_name,
            dev_field: getDevField(),
            spe_field: getSpeField(),
            dev_lang: getDevLang(),
            templateNum: getTemplateNum(),
            user_id: req.user.id,
        });
        const port = await Portfolio.findAll({
            attributes: ['id', 'port_name'],
            where: { user_id: req.user.id },
            order: [['id', 'DESC']],
            limit: 1,
        });
        await Info.create({
            profile_image: getProfileImage(),
            open_age: getOpenAge(),
            intro_comment: getIntroComment(),
            port_id: port[0].id,
        });
        if (getStory != 'undefined') {
            await Project_Experience.create({
                pro_name: getStoryName(),
                pro_comment: getStoryInfo(),
                pro_link: getStoryLink(),
                pro_image: getStoryUrl(),
                port_id: port[0].id,
            });
        }
        if (getUserCareer() == 1) {
            var careerDetail = getCareerDetail();
            await Career_Detail.create({
                com_name: getCareerName(),
                com_term: getCareerTerm(),
                com_comment: getCareerComment(),
                user_id: req.user.id,
            });
        }
        return res.render('portfolio_complete', {
            user: req.user,
        });
    } catch (error) {
        console.log(error);
        return error('error');
    }
});

router.get('/complete', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.find({
            where: {
                id: req.user.id,
            },
        });
        console.log(user);
        const port = await Portfolio.find({
            where: {
                user_id: req.user.id,
            },
            order: [['id', 'DESC']],
            limit: 1,
        });
        console.log(port);
        const project = await Project_Experience.find({
            where: {
                port_id: port.id,
            },
        });
        console.log(project);
        const info = await Info.find({
            where: {
                port_id: port.id,
            },
        });
        console.log(info);
        const career = await Career_Detail.find({
            where: {
                user_id: req.user.id,
            },
        });
        console.log(career);
        return res.render(`template${port.templateNum}`, {
            name: req.user.name,
            port_name: port.port_name,
            age: user.age,
            phone: user.phone,
            email: user.email,
            school: user.univ,
            info: info.intro_comment,
            image: info.profile_image,
            lang: port.dev_lang,
            exp_name: career.com_name,
            exp_content: career.com_comment,
            exp_term: career.com_term,
            project_name: project.pro_name,
            project_link: project.pro_link,
            project_content: project.pro_comment,
        });
    } catch (error) {
        console.log(error);
        return error('error');
    }
});

router.get('/complete/:id', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.find({
            where: {
                id: req.user.id,
            },
        });
        console.log(user);
        const port = await Portfolio.find({
            where: {
                id: req.params.id,
            },
        });
        console.log(port);
        const project = await Project_Experience.find({
            where: {
                port_id: port.id,
            },
        });
        console.log(project);
        const info = await Info.find({
            where: {
                port_id: port.id,
            },
        });
        console.log(info);
        const career = await Career_Detail.find({
            where: {
                user_id: req.user.id,
            },
        });
        console.log(career);
        return res.render(`template${port.templateNum}`, {
            name: req.user.name,
            port_name: port.port_name,
            age: user.age,
            phone: user.phone,
            email: user.email,
            school: user.univ,
            info: info.intro_comment,
            image: info.profile_image,
            lang: port.dev_lang,
            exp_name: career.com_name,
            exp_content: career.com_comment,
            exp_term: career.com_term,
            project_name: project.pro_name,
            project_link: project.pro_link,
            project_content: project.pro_comment,
        });
    } catch (error) {
        console.log(error);
        return error('error');
    }
});

module.exports = router;