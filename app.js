import express from "express";
import bodyparser from "body-parser";
import conn from "./src/db/conn";
import UserRoutes from "./src/routes/user";
import TransactionRoutes from "./src/routes/transaction";

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

/* POST request User Signup Login */
app.use("/user", UserRoutes);

/* Transaction */
app.use("/transaction", TransactionRoutes);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
