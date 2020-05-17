const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { User } = require("../models");

const router = express.Router();

router.get("/", isNotLoggedIn, (req, res, next) => {
  res.render("loginpage", {
    user: req.user,
  });
});

router.get("/temp", isNotLoggedIn, (req, res, next) => {
  res.render("joinpage");
});

router.post("/check", isNotLoggedIn, async (req, res, next) => {
  try {
    const { nick } = req.body;
    const exUser = await User.find({ where: { nick } });
    if (exUser) {
      req.flash("joinError", "이미 가입된 아이디입니다.");
      console.log("아이디 사용불가능!");
      return res.render("joinpage", {
        no: "not ok",
      });
    } else {
      console.log("아이디 사용가능!");
      return res.render("joinpage", {
        yes: "ok",
      });
    }
  } catch (error) {
    console.error(error);
    return next("error");
  }
});

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { name, nick, password, email, phone, year, graduate } = req.body;
  try {
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
      age,
      univ: graduate,
    });
    return res.render("loginpage", {
      joinSign: "ok",
    });
  } catch (error) {
    console.error(error);
    return next("error");
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash("loginError", info.message);
      return res.render("loginpage", {
        message: info.message,
      });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.render("index", {
        user: req.user,
      });
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
