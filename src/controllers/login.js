const loginRoutes = require("../routes/login");
const Post = require("../models/signup");

/* Login with Password */
exports.getLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Post.findOne({ email: email });
    if (!userEmail) res.send("Please sign Up");
    else {
      const token = await userEmail.generateAuthToken();
      console.log(token);

      if (userEmail.password === password) res.send("Successfully logged in");
      else res.send("Invalid credentials");
    }
  } catch (exe) {
    console.log(exe);
  }
};
