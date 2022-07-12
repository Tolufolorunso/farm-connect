const Joi = require("@hapi/joi");

const farmerRegistrationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "string.base": "name must not contains numbers",
      "string.min": "Name must not be less than 3 characters",
      "string.max": "Name must not be greater than 30 characters",
      "any.reguired": "Name is required",
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    passwordConfirm: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "any.only": "Your password and confirm password are not the same",
      }),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().pattern(new RegExp("^[0][0-9]{10}$")).messages({
      "string.pattern.base":
        "invalid values are not allowed , use the right phone number format - 08023456721",
    }),
  });
  return schema.validate(data, {
    abortEarly: false,
  });
};

const investorRegistrationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "string.base": "name must not contains numbers",
      "string.min": "Name must not be less than 3 characters",
      "string.max": "Name must not be greater than 30 characters",
      "any.reguired": "Name is required",
    }),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    passwordConfirm: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "any.only": "Your password and confirm password are not the same",
      }),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().pattern(new RegExp("^[0][0-9]{10}$")).messages({
      "string.pattern.base":
        "invalid values are not allowed , use the right phone number format - 08023456721",
    }),
    organization: Joi.string().allow("").messages({
      "string.base": "organization name must not contains numbers",
    }),
    businessPhoneNumber: Joi.string()
      .pattern(new RegExp("^[0][0-9]{10}$"))
      .allow("")
      .messages({
        "string.pattern.base":
          "invalid values are not allowed , use the right phone number format - 08023456721",
      }),
    businessEmail: Joi.string().allow("").email(),
    investmentFocus: Joi.string().messages({
      "string.base": "name must not contains numbers",
    }),
  });
  return schema.validate(data, {
    abortEarly: false,
  });
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string(),
  });
  return schema.validate(data, {
    abortEarly: false,
  });
};

const validateAmount = (req, res, next) => {
  
  let amount = parseFloat(req.body.amountNeeded);
  let unit = parseFloat(req.body.minimumInvestmentPerUnit);
  if (amount % unit !== 0) {
    res.status(404).json({
      status: "fail",
      message:
        "Amount Needed and minimum investment per unit are not valid, investment per unit must be a multiple of amount needed",
      data: {
        error:
          "Amount Needed and minimum investment per unit are not valid, investment per unit must be a multiple of amount needed",
      },
    });
  } else {
    next();
  }
};

module.exports.farmerRegistrationValidation = farmerRegistrationValidation;
module.exports.investorRegistrationValidation = investorRegistrationValidation;
module.exports.loginValidation = loginValidation;
module.exports.validateAmount = validateAmount;
