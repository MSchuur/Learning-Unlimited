const router = require('express').Router();
const {User} = require("../model");

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

router.get('/login', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('login');
});

router.get('/signup', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('signup');
});

router.get('/profile', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('profile');
});

router.get('/tutor', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('tutor');
});

router.get('/student', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('student');
});

module.exports = router;

