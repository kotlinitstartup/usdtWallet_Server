const userService = require("../services/userService");
const express = require("express");
const cors = require("cors");

module.exports = () => {
  let router = express.Router();
  router.use(cors());

  router.route("/info").get(userService.getInfo);
  router.route("/register").post(userService.register);
  router.route("/login").post(userService.login);

  return router;
};
