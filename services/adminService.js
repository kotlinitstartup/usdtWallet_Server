const adminRepository = require("../repositories/adminRepository");
const userRepository = require("../repositories/userRepository");
const User = require("../models/user");

module.exports = {
  getUserStats: async (req, res) => {
    try {
      const userId = req.userId;
      const userRow = await userRepository.findById(userId);
      const user = new User(
        userRow.id,
        userRow.username,
        userRow.email,
        userRow.password,
        userRow.role,
        parseFloat(userRow.wallet_balance),
        userRow.wallet_address,
        userRow.active
      );

      if (user.role != 1) {
        res.status(500).json({ message: "Error don't enought permissions" });
      }

      const rows = await adminRepository.getUserStats();
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching user counts" });
    }
  },

  getDepositStats: async (req, res) => {
    try {
      const userId = req.userId;
      const userRow = await userRepository.findById(userId);
      const user = new User(
        userRow.id,
        userRow.username,
        userRow.email,
        userRow.password,
        userRow.role,
        parseFloat(userRow.wallet_balance),
        userRow.wallet_address,
        userRow.active
      );

      if (user.role != 1) {
        res.status(500).json({ message: "Error don't enought permissions" });
      }

      const rows = await adminRepository.getDepositStats();
      const formattedData = rows.map(({ date_, amount_ }) => ({
        date_: new Date(date_).toISOString().split("T")[0],
        amount_,
      }));
      res.json(formattedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching deposit-stats" });
    }
  },

  getWithdrawalStats: async (req, res) => {
    try {
      const userId = req.userId;
      const userRow = await userRepository.findById(userId);
      const user = new User(
        userRow.id,
        userRow.username,
        userRow.email,
        userRow.password,
        userRow.role,
        parseFloat(userRow.wallet_balance),
        userRow.wallet_address,
        userRow.active
      );

      if (user.role != 1) {
        res.status(500).json({ message: "Error don't enought permissions" });
      }

      const rows = await adminRepository.getWithdrawStats();
      const formattedData = rows.map(({ date_, amount_ }) => ({
        date_: new Date(date_).toISOString().split("T")[0],
        amount_,
      }));
      res.json(formattedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching withdrawal-stats" });
    }
  },

  getTransferStats: async (req, res) => {
    try {
      const userId = req.userId;
      const userRow = await userRepository.findById(userId);
      const user = new User(
        userRow.id,
        userRow.username,
        userRow.email,
        userRow.password,
        userRow.role,
        parseFloat(userRow.wallet_balance),
        userRow.wallet_address,
        userRow.active
      );

      if (user.role != 1) {
        res.status(500).json({ message: "Error don't enought permissions" });
      }

      const rows = await adminRepository.getTransferStats();
      const formattedData = rows.map(({ date_, amount_ }) => ({
        date_: new Date(date_).toISOString().split("T")[0],
        amount_,
      }));
      res.json(formattedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching transfer-stats" });
    }
  },
};
