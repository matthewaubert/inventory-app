require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { decode } = require('he');
const { findError, formatPrice } = require('./utils/util');

const indexRouter = require('./routes/index');
const inventoryRouter = require('./routes/inventory'); // import routes for 'inventory' area of site
const compression = require('compression');
const helmet = require('helmet');

const app = express();
app.locals.decode = decode;
app.locals.findError = findError;
app.locals.formatPrice = formatPrice;

// set up rate limiter: max of 20 requests per minute
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 min
  max: 20,
});
app.use(limiter); // apply rate limiter to all requests

// add helmet to the middleware chain
// set CSP headers to allow images from Cloudinary
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'img-src': ["'self'", 'data:', 'https://res.cloudinary.com'],
      },
    },
  }),
);

// Set up mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI_PROD || process.env.MONGODB_URI_DEV;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); // compress all routes

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/inventory', inventoryRouter); // add inventory routes to middleware chain

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
