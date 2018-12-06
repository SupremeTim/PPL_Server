const express = require('express');
const { Portfolio, User, Sequelize: { Op } } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();
/*
router.get('/', isLoggedIn, (req, res, next) => {
    res.render('', {});
});
*/
router.post('/submit', async (req, res, next) => {
    try {
        const { dev_field, spe_field, career, minAge, maxAge, searchkeyword } = req.body;
        var min = 0;
        var max = 100;      // 기본 나이 범위
        var sign = 0;     // 기본 신입 검색 가정
        var dev='';
        var spe='';         // 기본 모두 역량 검색 가정
        if (career === 'yes') sign = 1;
        if (maxAge && minAge) {
            min = parseInt(minAge);
            max = parseInt(maxAge);
        } 
        if(spe_field) spe=spe_field;
        if(dev_field) dev=dev_field;        // 하나만 선택가능한 것으로 가정

        const port = await Portfolio.findAll({
            include: {
                model: User,
                //attributes:['name','age'],
                where: {
                    career: sign,
                    [Op.and]: [{ age: { [Op.gt]: min } }, { age: { [Op.lt]: max } }],
                }
            },
            where: {
                spe_field: {
                    [Op.like]: `%${spe}%`
                },
                dev_field: {
                    [Op.like]: `%${dev}%`
                },
                port_name: {
                    [Op.like]: `%${searchkeyword}%`
                },
            }
        });
        
        /*
        for (var i in port){
            console.log(port[i]);
        }*/
            
        return res.render('searchresultpage', {
            spec:spe,
            develop:dev,
            search:searchkeyword,
            results:port,
            user:req.user,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;