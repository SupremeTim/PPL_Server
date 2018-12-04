const express=require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router=express.Router();

router.get('/', isLoggedIn, (req,res,next)=>{
    res.render('portfolio_recommendtemplate', {
        user: req.user,
    });
});     

router.post('/template1',(req,res,next)=>{
    res.redirect('template1');
});

router.get('/back', (req,res,next) => {
    res.redirect(req.session.backURL || '/story')
});

router.post('/submit',(req,res,next)=>{
    res.render('portfolio_create', {
        user: req.user,
    });
});

module.exports=router;