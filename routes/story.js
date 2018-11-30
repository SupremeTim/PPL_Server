const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Portfolio, Project_experience, Dev_field, Dev_Lang, Spe_Field } = require('../models');
const { isLoggedIn, isNotLoggedIn, upload } = require('./middlewares');
var portId;
const router = express.Router();

router.get('/', isLoggedIn, (req, res, next) => {
    portId = await Portfolio.find({
        attributes: 'id',            // 포트폴리오 id를 가져옴
        where: {
            user_id: req.user.id,    // 현재 유저가 만든 
        },
        order: [['id', 'DESC']],      // 유저가 만든 포트폴리오 중에 가장 뒤에 있는 것이 방금 만든 포트폴리오이므로
    });  
    res.render('', {
        name: req.user.name,     // 오른쪽 위에 이름 출력
    });                        // 기본정보에서 다음 누르고 난뒤 프론트파일 보여주기
});

fs.readdir('uploads', (error) => {
    if (error) {
        console.error('uploads 폴더가 없어 생성합니다.');
        fs.mkdirSync('uploads');
    }
});

router.post('/img', upload.single('img'), (req, res) => {
    res.json({ url: `/img/${req.file.filename}` });
});

router.post('/exp', async (req, res, next) => {     // 경험박스마다 저장이 있었으면 좋겠음
    try {
        await Project_experience.create({
            pro_name: req.body.name,
            pro_comment: req.body.comment,
            pro_link: req.body.link,
            pro_image: req.body.url,
            port_id: portId,
        });                          // 프론트랑 맞추기
        res.send('Save experience complete!')
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/submit', async (req, res, next) => {
    try {
        await Dev_field.create({
            android:req.body.data1[0],
            ios:req.body.data1[1],
            web:req.body.data1[2],
            server:req.body.data1[3],
        });
        await Dev_Lang.create({
            c:req.body.data2[0],
            cpp:req.body.data2[1],
            csharp:req.body.data2[2],
            java:req.body.data2[3],
            python:req.body.data2[4],
        });
        await Spe_Field.create({
            secure:req.body.data3[0],
            iot:req.body.data3[1],
            ai:req.body.data3[2],
            bigdata:req.body.data3[3],
            db:req.body.data3[4],
            game:req.body.data3[5],
            networking:req.body.data3[6],
            os:req.body.data3[7],
        });                     // 역량 저장
        res.redirect('/template');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;