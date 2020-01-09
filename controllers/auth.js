const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppCinfig')

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post(`/signup`, function(req, res) {
  // find or create user
  db.user.findOrCreate({
    where : {
      email: req.body.email
    }, 
    defaults: {
      name : req.body.name,
      password: req.body.password
    }
  }).then(function([user, created]){
    if (created) {
      passport.authenticate('local',  {
        successRedirect: '/', 
        successFlash: ''
      })(req, res)
    } else {
      req.flash('error', 'Email already exists')
      res.redirect('/auth/signup')
    }
  }).catch(function(err) {
    console.log(err)
    res.redirect('/auth/signup')
  })
  // if user existed err and redirect to signup
})

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post(`/login`, passport.authenticate('local', {
  successRedirect: '/',
  successFlash: '',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username or password'
}))

router.get(`/logout`, function(req, res) {
  req.logout();
  req.flash('success', 'you have been logged out!')
  res.redirect('/');
})

module.exports = router;
