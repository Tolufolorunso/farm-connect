const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide Your fistname'],
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 2,
    trim: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide password'],
    trim: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Please, Passwords are not the same',
    },
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide your phone number'],
  },
  businessPhoneNumber: {
    type: String,
  },
  businessEmail: {
    type: String,
    // unique: true,
    lowercase: true,
    trim: true,
  },
  investmentFocus: {
    type: String,
    trim: true,
  },
  organization: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['farmer', 'investor', 'admin'],
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
