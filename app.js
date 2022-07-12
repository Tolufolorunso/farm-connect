const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const investmentRoutes = require('./routes/investment');
const productRoutes = require('./routes/product');
const emailRoutes = require('./routes/email');
const connectDB = require('./db/connect');

const app = express();

//HTTP headers
app.use(helmet());

app.use(cors());

//Against brute attack
const rateLimiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});
app.use('/api', rateLimiter);

app.use(express.json({ limit: '10mb' }));
app.use(
  express.urlencoded({
    limit: '10mb',
    extended: false,
    parameterLimit: 10000,
  })
);

//NoSQL query injection -Data Sanitization
app.use(mongoSanitize());

//xss attack -Data Sanitization
app.use(xss());

//HTTP parament pollution
app.use(hpp());

app.use('/api/v1/investment', investmentRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/email', emailRoutes);

app.get('/', (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Welcome to FarmConnect api page',
  });
});

//Handling unhandle routes
app.all('*', (req, res, next) => {
  console.log(req);
  return res.status(404).json({
    status: 'Error 404',
    message: `Page not found. Can't find ${req.originalUrl} on this server`,
  });
});

let DB;

if (process.env.NODE_ENV === 'development') {
  DB = process.env.MONGO_LOCAL;
} else {
  DB = process.env.MONGO_URI;
}

const start = async () => {
  const PORT = process.env.PORT || 4000;

  try {
    await connectDB(DB);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
