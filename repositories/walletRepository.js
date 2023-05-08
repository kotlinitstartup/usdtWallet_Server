const db = require("../db");

module.exports = {
  makeTransfer: async (userId, receiverId, amount) => {
    try {
      await db.query("BEGIN");
      const result = await db.query("SELECT transfer_usdt($1, $2, $3)", [
        userId,
        receiverId,
        amount,
      ]);
      const success = result.rows[0].transfer_usdt;
      if (success) {
        await db.query("COMMIT");
        return { success: true };
      } else {
        await db.query("ROLLBACK");
        return { success: false, message: "Transfer failed" };
      }
    } catch (e) {
      await db.query("ROLLBACK");
      console.error(e);
      throw e.message;
      return { success: false, message: e.message };
    }
  },

  makeWithdraw: async (userId, externalAddress, amount) => {
    const values = [userId, externalAddress, amount];
    const query = `SELECT * FROM make_withdraw($1, $2, $3)`;
    const result = await db.query(query, values);
    const withdrawId = result.rows[0].withdraw_id;
    return withdrawId;
  },

  getExternalWithdrawById: async (withdrawId) => {
    const query = "SELECT * FROM externalwithdrawals WHERE id = $1";
    const result = await db.query(query, [withdrawId]);
    const withdrawRow = result.rows[0];
    if (!withdrawRow) return null;
    return withdrawRow;
  },

  getExternalDepositById: async (depositId) => {
    const query = "SELECT * FROM externaldeposits WHERE id = $1";
    const result = await db.query(query, [depositId]);
    const depositRow = result.rows[0];
    if (!depositRow) return null;
    return depositRow;
  },

  makeDeposit: async (userId, externalAddress, amount) => {
    const query = `SELECT * FROM make_deposit($1, $2, $3)`;
    const values = [userId, externalAddress, amount];
    const result = await db.query(query, values);
    const depositId = result.rows[0].deposit_id;
    return depositId;
  },

  getExternalDepositById: async (depositId) => {
    const query = "SELECT * FROM externaldeposits WHERE id = $1";
    const result = await db.query(query, [depositId]);
    const depositRow = result.rows[0];
    if (!depositRow) return null;
    return depositRow;
  },

  getHistory: async (userId) => {
    const query = `SELECT * FROM get_user_history($1)`;
    const values = [userId];
    const { rows } = await db.query(query, values);
    return rows;
  },
};
