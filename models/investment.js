const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    trim: true,
  },
  ref: {
    type: String,
    trim: true,
  },
  returns: {
    type: String,
    lowercase: true,
    trim: true,
  },
  duration: {
    type: String,
    lowercase: true,
    trim: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  amountInvested: {
    type: String,
  },
  investedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Investment = mongoose.model("Investment", investmentSchema);

module.exports = Investment;
