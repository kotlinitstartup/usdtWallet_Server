const { Pool } = require("pg");

const pool = new Pool({
  user: "wallet_admin",
  password: "walletadmin",
  host: "8.210.33.51",
  database: "usdtwallet",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
