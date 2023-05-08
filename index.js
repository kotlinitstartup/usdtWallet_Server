const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { jwt, jsonwebtoken } = require("./middlewares/jwt");

const adminRouter = require("./routers/adminRouter")();
const userRouter = require("./routers/userRouter")();
const walletRouter = require("./routers/walletRouter")();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).send("Invalid JSON");
});

app.use(jwt);
app.use("/admin/", adminRouter);
app.use("/users/", userRouter);
app.use("/wallet/", walletRouter);
app.use((req, res, next) => {
  res.error();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
