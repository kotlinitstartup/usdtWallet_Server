const db = require("../db");

module.exports = {
  getUserStats: async () => {
    const query = `SELECT * FROM get_user_stats();`;
    const { rows } = await db.query(query);
    return rows;
  },

  create: async (username, email, hashedPassword, walletAdress) => {
    const values = [username, email, hashedPassword, walletAdress];
    const result = await db.query("CALL create_user($1, $2, $3, $4)", values);
    return email;
  },

  findById: async (userId) => {
    const query = {
      text: "SELECT * FROM find_user_by_id($1)",
      values: [userId],
    };
    const result = await db.query(query);
    const userRow = result.rows[0];

    if (!userRow) return null;
    return userRow;
  },

  findByEmail: async (email) => {
    const query = "SELECT * FROM find_user_by_email($1)";
    const result = await db.query(query, [email]);
    const userRow = result.rows[0];
    if (!userRow) return null;
    return userRow;
  },
};
