var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");

var Usuario = mongoose.model("Usuario");
var Queja = mongoose.model("Queja");

module.exports = function(passport){

    passport.serializeUser((datos,done) => {
        done(null, datos);
    });

    passport.deserializeUser((datos,done) => {
        done(null, datos);
    });

    passport.use("registrar", new LocalStrategy({usernameField: "usuario", passwordField: "contraseña", passReqToCallback: true}, (req,usuario,contraseña,done) => {
        Usuario.findOne({usuario: usuario},(err,document) => {
            if(err){
                return done("Error en la db: "+err,false);
            } else if(document){
                return done("El usuario ya existe",false);    
            }else{
                var nuevo = new Usuario();
                nuevo.nombre = req.body.nombre;
                nuevo.usuario = usuario;
                nuevo.contraseña = crearHash(contraseña);
                nuevo.save( (err,nuevo) => {
                    if(err){
                        return done("Error en la db: "+err,false);
                    }else{
                        return done(null,{nombre: nuevo.nombre, usuario: nuevo.usuario});
                    }
                });
            }
        });
    }));

    passport.use("iniciar", new LocalStrategy({usernameField: "usuario", passwordField: "contraseña",passReqToCallback: true}, (req,usuario,contraseña,done) => {
        Usuario.findOne({usuario: usuario},(err,document) => {
            if(err){
                return done("Error en la db: "+err,false);
            }else if(!document){
                return done("El usuario no existe",false);
            }

            if(validarClave(document,contraseña)){
                return done(null,{usuario: document.usuario, nombre: usuario.nombre});
            }
            else{
                return done("Contraseña incorrecta",false);
            }
        });
    }));

    function validarClave(usuario, contraseña){
		return bcrypt.compareSync(contraseña, usuario.contraseña);
	};

	function crearHash(contraseña){
		return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(10), null);
	};
};