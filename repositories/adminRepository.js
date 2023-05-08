const db = require("../db");

module.exports = {
  getUserStats: async () => {
    const query = `SELECT * FROM get_user_stats();`;
    const { rows } = await db.query(query);
    return rows;
  },

  getDepositStats: async () => {
    const query = `SELECT * FROM get_deposit_stats();`;
    const { rows } = await db.query(query);
    return rows;
  },

  getWithdrawStats: async () => {
    const query = `SELECT * FROM get_withdraw_stats();`;
    const { rows } = await db.query(query);
    return rows;
  },

  getTransferStats: async () => {
    const query = `SELECT * FROM get_transfer_stats();`;
    const { rows } = await db.query(query);
    return rows;
  },
};
