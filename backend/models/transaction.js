const mongoose = require("mongoose");

const transactionItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TransactionItem = mongoose.model("TransactionItem", transactionItemSchema);

module.exports = TransactionItem;
