const { Pool } = require("pg");

const pool = new Pool({
  user: "ivanmashuk",
  host: "localhost",
  database: "usdtwallet",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
