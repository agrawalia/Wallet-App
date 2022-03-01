import UserRoutes from "../routes/user";
import UserService from "../services/user";
import Post from "../models/user";

/* Send Email Verification Mail to User on Signup */
exports.getPosts = async (req, res, next) => {
  try {
    const user = await UserService.getPosts;
  } catch (exe) {
    res.status(400).send(exe);
  }
};

/* Signup Success after Email Verification */
exports.activateAccount = async (req, res, next) => {
  try {
    const user = await UserService.activateAccount;
  } catch (exe) {
    res.status(400).send(exe);
  }
};

/* Login with Password */
exports.getLogin = async (req, res, next) => {
  try {
    const user = await UserService.getLogin;
    if (user) {
      res.json({ user: "Sign In Successfully" });
    } else {
      res.json({ user: "Sign In failed" });
    }
  } catch (exe) {
    res.status(400).send(exe);
  }
};
