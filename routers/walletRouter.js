const walletService = require("../services/walletService");
const express = require("express");
const cors = require("cors");

module.exports = () => {
  let router = express.Router();
  router.use(cors());

  router.route("/deposit").post(walletService.deposit);
  router.route("/withdraw").post(walletService.withdraw);
  router.route("/transfer").post(walletService.transfer);
  router.route("/history").get(walletService.history);

  return router;
};
