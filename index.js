var express = require('express');
var session = require("express-session");
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Modelos y passportjs
var mongo = require("./config/base").conectar();
var passport = require("passport");
require("./config/passport-config")(passport);

//Rutas
var api = require('./routes/api');
var autentificar = require('./routes/autentificar')(passport);

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
app.use('/api', api);
app.use('/autentificar', autentificar);


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(app.get('port'), () => {
  console.log('Aplicación ejecutándose en el puerto', app.get('port'));
});