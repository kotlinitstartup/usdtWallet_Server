const adminService = require("../services/adminService");
const express = require("express");
const cors = require("cors");

module.exports = () => {
  let router = express.Router();
  router.use(cors());

  router.route("/user-stats").get(adminService.getUserStats);
  router.route("/deposit-stats").get(adminService.getDepositStats);
  router.route("/withdrawal-stats").get(adminService.getWithdrawalStats);
  router.route("/transfer-stats").get(adminService.getTransferStats);

  return router;
};
