const createError = require('http-errors');
const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const Redis = require('connect-redis')(session);

const dbRedis = require('redis');

const client = dbRedis.createClient();

const formidable = require('formidable');
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

const app = express();
app.use((req, res, next) => {
  if (req.method === 'POST') {
    const form = formidable.IncomingForm({
      uploadDir: path.join(__dirname, '/public/images'),
      keepExtensions: true,
    });
    form.parse(req, (err, fields, files) => {
      req.body = fields;
      req.fields = fields;
      req.files = files;
      next();
    });
  } else {
    next();
  }
});
app.use(
  session({
    store: new Redis({
      host: 'localhost',
      logErrors: true,
      port: 6379,
      client,
    }),
    secret: 'localhostsecret',
    resave: true,
    saveUninitialized: true,
  }),
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/admin', adminRouter);

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
