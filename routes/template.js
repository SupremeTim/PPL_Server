const express=require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router=express.Router();

router.get('/',(req,res,next)=>{
    res.render('/template1');
});     

router.post('/template1',(req,res,next)=>{
    res.redirect('template1');
});

router.get('/submit',(req,res,next)=>{
    res.redirect();                         // 완성 페이지로 넘어가기
});

module.exports=router;