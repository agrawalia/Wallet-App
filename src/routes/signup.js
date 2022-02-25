const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');
const signUpController = require('../controllers/signup');

// /api/signup
router.post('/signup', signUpController.getPosts);

// /api/email-activate
router.post('/email-activate',signUpController.activateAccount);

module.exports = router;