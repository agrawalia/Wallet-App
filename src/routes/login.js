const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login");

// /api/login {body : email,password}
router.post("/login", loginController.getLogin);
module.exports = router;
