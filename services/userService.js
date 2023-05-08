const userRepository = require("../repositories/userRepository");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { jwt, jsonwebtoken } = require("../middlewares/jwt");

const createUSDTAddress = () => {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const addressLength = 34;
  let address = "0x";

  for (let i = 0; i < addressLength; i++) {
    address += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  return address;
};

module.exports = {
  getInfo: async (req, res) => {
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
      res.json({ user: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error unauthorized" });
    }
  },

  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const walletAdress = createUSDTAddress();
      const UserEmail = await userRepository.create(
        username,
        email,
        hashedPassword,
        walletAdress
      );
      const userRow = await userRepository.findByEmail(UserEmail);
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
      const accessToken = jsonwebtoken.sign({ userId: user.id }, "secret");

      res.json({ accessToken: accessToken, user: user });
    } catch (error) {
      res.status(500).json({ message: error.detail });
    }
  },

  login:
    (jwt,
    async (req, res) => {
      try {
        const { email, password } = req.body;
        const userId = req.userId;
        if (userId) {
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
          const accessToken = jsonwebtoken.sign({ userId: user.id }, "secret");

          res.json({ accessToken: accessToken, user: user });
        } else {
          const userRow = await userRepository.findByEmail(email);
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
          if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
          }
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
          }
          const accessToken = jsonwebtoken.sign({ userId: user.id }, "secret");

          res.json({ accessToken: accessToken, user: user });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error logging in user" });
      }
    }),
};
