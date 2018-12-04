const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/',  isLoggedInd, (req, res, next) => {
    res.render('portfolio', {
        user:req.user,
    });
});

module.exports = router;