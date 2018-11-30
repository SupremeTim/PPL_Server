const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { name, nick, password, email, phone, year } = req.body; // form태그 name 변수
    try {
        const exUser = await User.find({ where: { nick } });
        if (exUser) {
            req.flash('joinError', '이미 가입된 아이디입니다.');
            return res.redirect('/join');
        }
        const d = new Date();
        const n = d.getFullYear();
        const age = n - year;
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            name,
            nick,
            password: hash,
            email,
            phone,
            birth: age,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next('error');
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');       // 메인 페이지 '양시연님' 출력용도, name 프론트랑 맞추기, html 파일 맞추기!!!!!!
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;