"use strict";
var compression = require("compression"),
	express = require("express"),
	session = require("express-session"),
	path = require("path"),
	logger = require("morgan"),
	cookieParser = require("cookie-parser"),
	bodyParser = require("body-parser"),
	fallback = require("express-history-spa-fallback");
//var favicon = require("serve-favicon");
require("dotenv").load();

//Passportjs y base
var passport = require("passport");
require("./config/passport-config")(passport);
require("./config/base").conectar(process.env.BASE_URL);

//Módulos
var quejas = require("./routes/quejas"),
	usuarios = require("./routes/usuarios"),
	autentificar = require("./routes/autentificar")(passport);

var app = express();

app.set("port", (process.env.PORT || 5000));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: process.env.SECRET}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.disable("x-powered-by");
//app.use(favicon(path.join(__dirname,"public","images","favicon.ico")));


//Rutas
app.get("/", (req,res) => {
	res.render("inicio");
});
app.get("/prueba", (req,res) => res.render("prueba"));
app.use("/quejas", quejas);
app.use("/autentificar", autentificar);
app.use("/usuarios", usuarios);
app.use(fallback.default( (req,res) => res.render("inicio") ));

app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

app.listen(app.get("port"), () => {
	console.log("Aplicación ejecutándose en el puerto", app.get("port"));
});