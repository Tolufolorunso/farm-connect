const Investment = require("../models/investment");
const Product = require("../models/product");

exports.createInvestment = async (req, res, next) => {
  try {
    let product = await Product.findOne({ _id: req.body.product });
    if (+product.amountNeeded === +product.amountCollected) {
      return res.status(401).json({
        message: "You cannot invest in this project. try another product!",
      });
    }

    console.log(+req.body.amountInvested + +product.amountCollected);
    if (
      +req.body.amountInvested + +product.amountCollected >
      +product.amountNeeded
    ) {
      return res.status(401).json({
        message:
          "You cannot invest in this product. reduce your investment unit!",
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.body.product,
      {
        amountCollected: +product.amountCollected + +req.body.amountInvested,
      },
      {
        new: true,
      }
    );

    const investment = await Investment.create(req.body);

    res.status(200).send({
      status: "success",
      data: { investment },
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
