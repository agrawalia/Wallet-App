const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signup");

// /api/signup {body: name,email,password,balance}
router.post("/signup", signUpController.getPosts);

// /api/email-activate {body: token}
router.post("/email-activate", signUpController.activateAccount);

module.exports = router;
