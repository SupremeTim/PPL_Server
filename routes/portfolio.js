const express=require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router=express.Router();

router.get('/', isLoggedIn, (req,res,next)=>{
    res.render('portfolio_create', {
        user:req.user,
    });
});

router.get('/submit',async(req,res,next)=>{
    res.render('portfolio_complete', {
        user: req.user,
    });
});

module.exports=router;