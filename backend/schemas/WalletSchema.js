const { Schema } = require("mongoose");

const WalletSchema = new Schema({
  userId: String,
  balance: Number,
});

module.exports = { WalletSchema };
