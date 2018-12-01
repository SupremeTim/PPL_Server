const express=require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router=express.Router();

router.get('/',(req,res,next)=>{
    res.render('',{
        name:req.user.name,
    });
});     

router.post('/submit',async(req,res,next)=>{
    try{
        const portId = await Portfolio.find({
            attributes: 'id',            // 포트폴리오 id를 가져옴
            where: {
                user_id: req.user.id,    // 현재 유저가 만든 
            },
            order: [['id', 'DESC']],      // 유저가 만든 포트폴리오 중에 가장 뒤에 있는 것이 방금 만든 포트폴리오이므로
        });  
        await Portfolio.update({
            // url도 추가해야됨
            port_name: req.body.port_name,
        }, {
            where: { id: port_id},
        });
        res.send('Success!');                         // 완성 페이지로 넘어가기
    }
    catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports=router;