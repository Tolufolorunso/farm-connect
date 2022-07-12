const express = require("express");
const router = express.Router();

const userController = require("../controllers/email");


router.post("/subscribe", userController.addEmail);


module.exports = router;