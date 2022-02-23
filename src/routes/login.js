const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');
const loginController = require('../controllers/login');

// /api/login
router.post('/login',loginController.getLogin);
module.exports = router;