const walletRepository = require("../repositories/walletRepository");
const userRepository = require("../repositories/userRepository");
const User = require("../models/user");

const { jwt, jsonwebtoken } = require("../middlewares/jwt");

module.exports = {
  deposit:
    (jwt,
    async (req, res) => {
      try {
        const userId = req.userId;
        const { amount, address } = req.body;

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

        if (amount < 1) {
          throw new Error("Wrong amount");
        }

        const depositId = await walletRepository.makeDeposit(
          userId,
          address,
          amount
        );
        const deposit = await walletRepository.getExternalDepositById(
          depositId
        );

        res.json(deposit);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deposit" });
      }
    }),

  withdraw:
    (jwt,
    async (req, res) => {
      try {
        const userId = req.userId;
        const { amount, address } = req.body;
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

        if (user.walletBalance < amount) {
          throw new Error("Do not enough balance");
        }

        if (address == null) {
          throw new Error("ExternalAddress is null");
        }
        const withdrawId = await walletRepository.makeWithdraw(
          userId,
          address,
          amount
        );
        const withdraw = await walletRepository.getExternalWithdrawById(
          withdrawId
        );
        res.json(withdraw);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error withdraw" });
      }
    }),

  transfer:
    (jwt,
    async (req, res) => {
      try {
        const userId = req.userId;
        const { id, amount } = req.body;

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

        if (user.walletBalance < amount) {
          throw new Error("Do not enough balance");
        }

        if (id == null) {
          throw new Error("Id is null");
        }

        let transfer = await walletRepository.makeTransfer(userId, id, amount);
        res.json(transfer);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }),

  history:
    (jwt,
    async (req, res) => {
      try {
        const userId = req.userId;
        let history = await walletRepository.getHistory(userId);
        res.json(history);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error gettin history" });
      }
    }),
};
