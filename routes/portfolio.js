const express=require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const { setPortId, getPortId, setPortView, getPortView,
    getDevField, getDevLang, getSpeField, getUserId } = require('../modules/port_modules');
const { getUserCareer } = require('../modules/user_modules');
const { getStory, getStoryName, getStoryInfo, getStoryLink, getStoryUrl } = require('../modules/story_modules');
const { getOpenAge, getIntroComment, getProfileImage } = require('../modules/info_modules');
const { getCareerDetail, getCareerName, getCareerTerm, getCareerComment } = require('../modules/career_modules');

const { User, Portfolio, Project_Experience, Info, Career_Detail } = require('../models');

const router=express.Router();

router.get('/', isLoggedIn, (req,res,next)=>{
    res.render('portfolio_create', {
        user:req.user,
    });
});

router.post('/submit', async (req,res,next)=>{
    try{
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
        await Project_Experience.create({
            pro_name: getStoryName(),
            pro_comment: getStoryInfo(),
            pro_link: getStoryLink(),
            pro_image: getStoryUrl(),
            port_id: port[0].id,
        });
        if (getUserCareer() == 1){
            var careerDetail = getCareerDetail();
            await Career_Detail.create({
                com_name: getCareerName(),
                com_term: getCareerTerm(),
                com_comment: getCareerComment(),
                user_id: req.user.id,
            });
        }
        res.render('portfolio_complete', {
            user: req.user,
        });
    } catch(err) {
        console.log(err);
    }
});

module.exports=router;