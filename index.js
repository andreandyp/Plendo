var express = require('express');
var session = require("express-session");
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fallback = require("express-history-spa-fallback");
//var favicon = require('serve-favicon');

//Modelos y passportjs
var mongo = require("./config/base").conectar();
var passport = require("passport");
require("./config/passport-config")(passport);

//Rutas
var quejas = require('./routes/quejas'),
    autentificar = require('./routes/autentificar')(passport);
    usuarios = require("./routes/usuarios");

var app = express();

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "ContraseñaMuyCompleja05042017"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

//Rutas

app.get("/", (req,res) => {
  res.render("inicio")
});
app.use('/quejas', quejas);
app.use('/autentificar', autentificar);
app.use("/usuarios", usuarios);
app.use(fallback.default( (req,res) => res.render("inicio") ));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(app.get('port'), () => {
  console.log('Aplicación ejecutándose en el puerto', app.get('port'));
});