const express=require('exrpess');

const router=express.Router();

router.get('/',(req,res,next)=>{
    res.render('',{});
});

module.exports=router;