require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session      = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash        = require('req-flash');

//connect with database
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, function(err){
    if(err) console.log("ERROR",err);
    else console.log("connected to database garden");
});

//declare routes
var indexRouter   = require('./routes/index');
var authRouter    = require('./routes/auth');
var gardenRouter  = require('./routes/garden');
var createRouter  = require('./routes/create');



var app = express();
app.set( 'view engine', 'hbs' );
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "XD"
}));

app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

app.use(flash());
app.use((req, res, next) =>{
  res.locals.messages = req.flash();
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// app.set('view engine', 'hbs');
app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/',
  partialsDir: __dirname + '/views/partials/'
 } ) );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use app 
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', require('./routes/site-routes'));
app.use('/', gardenRouter);
app.use('/', createRouter);
app.use('/', require('./routes/auth'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen((process.env.PORT || 3000), function(){
  console.log('listening on *:3000');
});