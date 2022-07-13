const Product = require('../models/product');
const jwt = require('jsonwebtoken');

exports.createProduct = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const id = decodedToken.id;

  if (req.file.filename) {
    req.body.image = req.file.filename;
    const newProduct = Product.create(req.body);
    newProduct
      .then((product) => {
        Product.findOneAndUpdate(
          { _id: product._id },
          { farmer: id },
          {
            new: true,
          }
        ).then((product) => {
          res.status(201).json({
            status: 'success',
            message: 'Product registered successfully',
            data: {
              name: product.name,
              location: product.location,
            },
          });
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: 'fail',
          message: 'product registration not successfull',
          data: {
            error: error.message,
          },
        });
      });
  } else {
    res.status(400).json({
      status: 'fail',
      message: 'product registration not successfull',
      data: {
        error: error.message,
      },
    });
  }
};

exports.getAllProduct = (req, res, next) => {
  const filter = {};
  Product.find(filter)
    .then((products) => {
      if (products) {
        return res.status(200).send({
          status: true,
          data: products,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

exports.getAllUsersProduct = (req, res, next) => {
  const _id = req.params.user_id;
  const filter = { farmer: _id };
  Product.find(filter)
    .then((products) => {
      if (products) {
        return res.status(200).send({
          status: true,
          data: products,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};
