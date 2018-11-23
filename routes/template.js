const express=require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router=express.Router();

router.get('/',(req,res,next)=>{
    res.render('',{});
});     

router.get('/submit',(req,res,next)=>{
    res.redirect();                         // 완성 페이지로 넘어가기
});

module.exports=router;