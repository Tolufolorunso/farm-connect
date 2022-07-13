const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');
const upload = require('../utils/upload');

//user controller
const userController = require('../controllers/product');

router.get(
  '/',
  auth.authentication('farmer', 'admin', 'investor'),
  userController.getAllProduct
);
router.get(
  '/:user_id',
  auth.authentication('farmer', 'admin', 'investor'),
  userController.getAllUsersProduct
);
router.post(
  '/',
  auth.authentication('farmer', 'admin'),
  upload.single('image'),
  validation.validateAmount,
  userController.createProduct
);

module.exports = router;
