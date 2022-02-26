const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const jwt = require("jsonwebtoken");

const conn = require("./src/db/conn");
const Signup = require("./src/models/signup");
const transaction = require("./src/models/transaction");
const SignUpRoutes = require("./src/routes/signup");
const LoginRoutes = require("./src/routes/login");
const TransactionRoutes = require("./src/routes/transaction");

const port = process.env.PORT;
const app = express();

app.use(bodyparser.json());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Methods", "Content-Type , Authorization");
  next();
});

//POST request signup
app.use("/api", SignUpRoutes);

//POST request signin
app.use("/api", LoginRoutes);

app.use("/api", TransactionRoutes);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
