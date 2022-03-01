import express from "express";
import UserController from "../controllers/user";
const router = express.Router();

// /user/signup {body: name,email,password,balance}
router.post("/signup", UserController.getPosts);

// /user/email-activate {body: token}
router.post("/email-activate", UserController.activateAccount);

// /user/login {body : email,password}
router.post("/login", UserController.getLogin);

module.exports = router;
