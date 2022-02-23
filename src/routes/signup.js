const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');
const signUpController = require('../controllers/signup');


router.post('/signup', signUpController.getPosts);

module.exports = router;