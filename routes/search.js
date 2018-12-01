const express = require('express');
const { Portfolio, Dev_Field, Dev_Lang, Spe_Field, User, Sequelize: { Op } } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', isLoggedIn, (req, res, next) => {
    res.render('', {});
});

router.get('/submit', async (req, res, next) => {
    try {
        const searchResult = await User.findAll({
            attributes: ['name', 'age'],
            include: [{
                model: Portfolio,
                // attributes:
                where: {
                    [Op.or]: [{
                        id: {
                            [Op.eq]: await Dev_Field.findAll({
                                attributes: ['port_id'],
                                where: {
                                    android: req.body.data1[0],
                                    ios: req.body.data1[1],
                                    web: req.body.data1[2],
                                    server: req.body.data1[3],
                                }
                            })
                        }
                    }, {
                        id: {
                            [Op.eq]: await Spe_Field.findAll({
                                attributes: ['port_id'],
                                where: {
                                    secure: req.body.data2[0],
                                    iot: req.body.data2[1],
                                    ai: req.body.data2[3],
                                    bigdata: req.body.data2[4],
                                    db: req.body.data2[5],
                                    game: req.body.data2[6],
                                    networking: req.body.data2[7],
                                    os: req.body.data2[8],
                                }
                            })
                        }
                    }, {
                        id: {
                            [Op.eq]: await Dev_Lang.findAll({
                                attributes: ['port_id'],
                                where: {
                                    c: req.body.data3[0],
                                    cpp: req.body.data3[1],
                                    csharp: req.body.data3[2],
                                    java: req.body.data3[3],
                                    python: req.body.data3[4],
                                }
                            })
                        }
                    }],
                },
            }],
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;