const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isLoggedIn, isNotLoggedIn,upload } = require('./middlewares');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('', {});                        // 기본정보에서 다음 누르고 난뒤 프론트파일 보여주기
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

router.post('/exp', async (req, res, next) => {
    try {
        await project_experience.create({
            pro_name: req.body.name,
            pro_comment: req.body.comment,
            pro_link: req.body.link,
            pro_image: req.body.url,
        });                                                             // 프론트랑 맞추기
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/submit', async (req, res, next) => {
    try {
        await dev_field.create({
            android:,
            ios:,
            web:,
            server:,
        });
        await dev_lang.create({
            c:,
            cpp:,
            csharp:,
            java:,
            python:,
        });
        await spe_field.create({
            secure:,
            iot:,
            ai:,
            bigdata:,
            db:,
            game:,
            networking:,
            os:,
        });                     // 역량 저장
        res.redirect('/template');
    } catch (error) {
        console.error(error);
        next(error);
    }
});



module.exports = router;