const mongoose = require("mongoose");
require("dotenv/config");
mongoose
  .connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  })
  .then(() => {
    console.log("mongodb connection successfull");
  })
  .catch((err) => {
    console.log(err);
    console.log("mongodb connection unsuccessfull");
  });
