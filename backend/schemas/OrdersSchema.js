const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  userId: String,
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = { OrdersSchema };
