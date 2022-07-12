const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const upload = require('../utils/upload');

//user controller
const userController = require('../controllers/user');

router.post('/signup/farmer', userController.signupFarmer);
router.post('/signup/investor', userController.signupInvestor);
router.post('/login', userController.login);

router.get(
  '/investors',
  auth.authentication('investor', 'admin'),
  userController.getAllInvestors
);
router.get(
  '/investors/:investorId',
  auth.authentication('investor', 'admin'),
  userController.getAInvestor
);

// router.patch(
//   '/profile/investor/:investorId',
//   auth.authentication('investor', 'admin'),
//   upload.single('image'),
//   userController.investorProfileUpdate
// );

router.get(
  '/farmers',
  auth.authentication('farmer', 'admin'),
  userController.getAllFarmers
);
router.get(
  '/farmers/:farmerId',
  auth.authentication('farmer', 'admin'),
  userController.getAFarmer
);

router.patch(
  '/profile/farmers/:farmerId',
  auth.authentication('farmer', 'admin'),
  upload.single('image'),
  userController.farmerProfileUpdate
);

module.exports = router;
