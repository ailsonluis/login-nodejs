var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const {SECRET} = require('./.env')

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const registerRouter = require('./routes/register')
const protectpageRouter = require('./routes/protectpage')


var app = express();

function isAuthenticated(req,res,next){
  
  console.log( "verifica se esta com sessao ativa")
  console.log('cookie', req.cookies['x-access-key'])
  let token = req.cookies['x-access-key']
  jwt.verify(token, SECRET, function(err, decoded) { 
   if (err){
     console.log("TokenInválido",token)
     res.redirect("/login")
   }
   if (decoded){
     console.log("tokenvalidao",decoded)
     next(); 
   }

   }); 
     
   
 
}

// view engine setup
nunjucks.configure('views', {
  autoescape: true,
  watch: true,
  express: app
});
app.set('view engine', 'nunjucks');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter)
app.use('/register',registerRouter);
app.use('/protectpage',isAuthenticated,protectpageRouter);

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

module.exports = app;
