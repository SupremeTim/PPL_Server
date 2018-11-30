const express = require('express');
const { Portfolio, Dev_field, Dev_Lang, Spe_Field, User, Sequelize: {Op} } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', isLoggedIn, (req, res, next) => {
    res.render('', {});
});

router.get('/submit', async (req, res, next) => {
   try {
    // const
    const searchPort = await Portfolio.findAll({
        attributes: ['id', 'user_id'],
        where: {
            port_name: { [Op.like]: '%req.body.search%' },
        },
    });
    const devF = await Dev_Field.findAll({
        attributes: ['port_id'],
        where: {
            android: req.body.data1[0],
            ios: req.body.data1[1],
            web: req.body.data1[2],
            server: req.body.data1[3],
        },
    });
    const speF = await Spe_Field.findAll({
        attributes: ['port_id'],
        where: {
            secure: req.body.data2[0],
            iot: req.body.data2[1],
            ai: req.body.data2[2],
            bigdata: req.body.data2[3],
            db: req.body.data2[4],
            game: req.body.data2[5],
            networking: req.body.data2[6],
            os: req.body.data2[7],
        },
    });
    const devL = await Dev_Lang.findAll({
        attributes: ['port_id'],
        where: {
            c: req.body.data3[0],
            cpp: req.body.data3[1],
            csharp: req.body.data3[2],
            java: req.body.data3[3],
            python:req.body.data3[4],
        },
    });
    const userId = await User.findAll({
        attributes: ['id'],
        where: {
            [Op.and]: [{birth: {[Op.gte]:req.body.low}}, {birth: {[Op.lte]:req.body.over}}],
        },
    });
    const userPort = await Portfolio.findAll({
        attributes: [],
        where:{
            user_id: userId,
        },
    });
    const devFPort = await Portfolio.findAll({
        attributes: ['id', 'port_id'],
        where: {
            id: devF,
        },
    });
    const devLPort = await Portfolio.findAll({
        attributes: ['id', 'port_id'],
        where: {
            id: devL,
        },
    });
    const speFPort = await Portfolio.findAll({
        attributes: ['id', 'port_id'],
        where: {
            id: speF,
        },
    });
   }
   catch (Exception e) {

   }
});

module.exports = router;