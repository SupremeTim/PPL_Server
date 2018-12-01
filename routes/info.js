const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isLoggedIn, isNotLoggedIn, upload } = require('./middlewares');

const { Info, Portfolio } = require('../models');
const router = express.Router();

fs.readdir('uploads', (error) => {
    if (error) {
        console.error('uploads 폴더가 없어 생성합니다.');
        fs.mkdirSync('uploads');
    }
});

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        await Portfolio.create({
            views: 0,
            user_id: req.user.id,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }

    res.render('', {
        name: req.user.name,
        phone: req.user.phone,
        email: req.user.email,
    });                         // 프론트랑 맞추기, 기본정보 출력
});                                     // 시작하기 버튼 누를시

router.post('/img', upload.single('img'), (req, res) => {
    res.json({ url: `/img/${req.file.filename}` });
});                             // 이미지 등록 버튼 누를 시, url만 넘길테니 이미지 출력은 프론트에서?

router.post('/submit', async (req, res, next) => {
    try {
        const portId = await Portfolio.find({
            attributes: 'id',            // 포트폴리오 id를 가져옴
            where: {
                user_id: req.user.id,    // 현재 유저가 만든 
            },
            order: [['id', 'DESC']],      // 유저가 만든 포트폴리오 중에 가장 뒤에 있는 것이 방금 만든 포트폴리오이므로
        });      // 유저가 만든 포트폴리오 중에 가장 뒤에 있는 것이 방금 만든 포트폴리오이므로
        // 검색해서 id 가져오도록 설정해보자!   
        await Info.create({              // form 태그의 name 속성 정해주기
            profile_image: req.body.url,
            open_age: req.body.age,
            intro_comment: req.body.content,
            port_id: portId,
        });
        res.redirect('/story');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;