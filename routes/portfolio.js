const express=require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { setPortName, getPortName } = require('../modules/port_modules');

const router=express.Router();

router.get('/', isLoggedIn, (req,res,next)=>{
    res.render('portfolio_create', {
        user:req.user,
    });
});

router.post('/submit',(req,res,next)=>{
    setPortName(req.body.port_name);
    res.render('portfolio_complete', {
        user: req.user,
    });
});

module.exports=router;