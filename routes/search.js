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
        const { dev_field, spe_field, career, minAge, maxAge } = req.body;
        /*
    if (spe_field) {
        for (var s in spe_field) {
            const img = await Portfolio.findAll({
                attributes: ['port_img'],
                where: {
                    spe_field: {
                        [Op.like]: `%${s}%`,
                    }
                },
            });
        }
    }

    if (dev_field) {
        for (var s in dev_field) {
            const img = await Portfolio.findAll({
                attributes: ['port_img'],
                where: {
                    dev_field: {
                        [Op.like]: `%${s}%`,
                    }
                },
            });
        }
    }

    if (career==='yes') {
        const id = await User.findAll({
            attributes: ['id'],
            where: {
                career: 1,
            },
        });
        const img = await Portfolio.findAll({
            attributes: ['port_img'],
            where: {
                user_id: id,
            },
        });
    } else if (career === 'no') {
        const id = await User.findAll({
            attributes: ['id'],
            where: {
                career: 0,
            },
        });
        const img = await Portfolio.findAll({
            attributes: ['port_img'],
            where: {
                user_id: id,
            },
        });
    }
    */
        if (minAge && maxAge) {
            const temp1 = parseInt(minAge);
            const temp2 = parseInt(maxAge);
            const user = await User.findAll({
                attributes: ['id'],
                where: {
                    [Op.and]: [{ age: { [Op.gt]: temp1 } }, { age: { [Op.lt]: temp2 } }],
                },
            });
            //console.log(user[0].id);
            for (var i in user) {
                const img = await Portfolio.findAll({
                    attributes: ['port_img'],
                    where: {
                        user_id: user[i].id,
                    },
                });
            }
        }

        return res.render('searchresultpage', {

        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;