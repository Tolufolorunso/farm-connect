const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const validation = require("../middleware/validation");

const investmentController = require("../controllers/investment");

router.post(
  "/",
  auth.authentication("investor", "admin"),
  investmentController.createInvestment
);

module.exports = router;
