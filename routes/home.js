const express=require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router=express.Router();

router.get('/',(req,res,next)=>{
    res.render('',{});
});

router.get('/login',isNotLoggedIn,(req,res,next)=>{
    res.render('',{});
});

router.get('/product',(req,res,next)=>{
    res.render('',{});
});

router.get('/make',(req,res,next)=>{
    res.render('',{});
});

router.get('/search',(req,res,next)=>{
    res.render('',{});
});

router.get('/setting',(req,res,next)=>{
    res.render('',{});
});
module.exports=router;