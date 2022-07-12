const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the product name"],
    trim: true,
  },
  amountNeeded: {
    type: String,
    required: [true, "Please provide the amount needed"],
    lowercase: true,
    trim: true,
  },
  durationOfInvestment: {
    type: String,
    required: [true, "Please provide the duration of investment"],
    lowercase: true,
    trim: true,
  },
  returnsOnInvestment: {
    type: String,
    required: [true, "Please provide the returns on investment"],
    lowercase: true,
    trim: true,
  },
  minimumInvestmentPerUnit: {
    type: String,
    required: [true, "Please provide the minimum investment per unit"],
    lowercase: true,
    trim: true,
  },
  projectDescription: {
    type: String,
    required: [true, "Please provide the project description"],
    lowercase: true,
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Please provide a picture that represent the project"],
    lowercase: true,
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Please provide the location"],
    lowercase: true,
    trim: true,
  },
  amountCollected: {
    type: String,
    default: 0,
    lowercase: true,
    trim: true,
  },
  approval: {
    type: Boolean,
    lowercase: true,
    trim: true,
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  investors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
