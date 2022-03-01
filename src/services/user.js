import UserRoutes from "../routes/user";
import Post from "../models/user";
import UserController from "../controllers/user";

import mailgun from "mailgun-js";
import jwt from "jsonwebtoken";
import "dotenv/config";
const mg = mailgun({ apiKey: process.env.API_KEY, domain: process.env.DOMAIN });

/* Send Email Verification Mail to User on Signup */
exports.getPosts = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const balance = req.body.balance;
    const token = jwt.sign(
      { name, email, role, password, balance },
      process.env.JWT_ACC_ACTIVATE,
      { expiresIn: "20m" }
    );
    const url = `${process.env.CLIENT_URL}/authentication/activate/${token}`;
    const data = {
      from: "noreply@ishan.com",
      to: email,
      subject: "Account Activation Link",
      html: `<h2> Please click on given link to activate your account </h2><br><p><a href=${url}>Click here</a></p>`,
    };
    mg.messages().send(data, function (error, body) {
      if (error) {
        return res.json({
          error: error.message,
        });
      }
      return res.json({
        message: "Email has been sent kindly activate your account.",
      });
    });
    const user = await UserService.getPosts;
  } catch (exe) {
    return res.json({
      message: "SignUp failed",
    });
    res.status(400).send(exe);
  }
};

/* Signup Success after Email Verification */
exports.activateAccount = async (req, res, next) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACC_ACTIVATE,
      async function (err, decodeToken) {
        if (err) {
          return res.status(400).json({ err: "Incorrect or expired link" });
        }
        const { name, email, password, role, balance } = decodeToken;
        const signupRecords = new Post({
          name: name,
          email: email,
          password: password,
          role: role,
          balance: balance,
          confirmed: true,
        });
        const token = await signupRecords.generateAuthToken();
        const insertRecord = await signupRecords.save();
        res.json({
          message: "You have successfully SignUp",
          balance: balance,
        });
      }
    );
  } else {
    return res.json({
      error: "Something went wrong",
    });
  }
};

/* Login with Password */
exports.getLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Post.findOne({ email: email });
    if (!userEmail) res.send("Please sign Up");
    else {
      const token = await userEmail.generateAuthToken();

      if (userEmail.password === password) res.send("Successfully logged in");
      else res.send("Invalid credentials");
    }
  } catch (exe) {}
};
