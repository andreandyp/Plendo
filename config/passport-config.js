var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt-nodejs");
var db = require("./base");

module.exports = function(passport){

    passport.serializeUser((datos,done) => {
        done(null, datos);
    });

    passport.deserializeUser((datos,done) => {
        done(null, datos);
    });

    passport.use("registrar", new LocalStrategy({usernameField: "usuario", passwordField: "contraseña", passReqToCallback: true}, (req,usuario,contraseña,done) => {
        
        db.get().collection("usuarios").findOne({ usuario: usuario }, {usuario: 1},
        (err, doc) => {
            if(err){
                return done("Error en la db: "+err,false);
            } else if(doc){
                return done("El usuario ya existe",false);
            }else{
                var nuevo = {
                    nombre: req.body.nombre,
                    usuario: usuario,
                    contraseña: crearHash(contraseña),
                    fechaHora: new Date(Date.now()),
                    quejas: []
                }
                db.get().collection("usuarios").insertOne(nuevo, (err, doc) => {
                    if(err){
                        return done("Error en la db: "+err,false);
                    }else{
                        return done(null,{nombre: nuevo.nombre, usuario: nuevo.usuario});
                    }
                })
            }
        });
    }));

    passport.use("iniciar", new LocalStrategy({usernameField: "usuario", passwordField: "contraseña",passReqToCallback: true}, (req,usuario,contraseña,done) => {

        db.get().collection("usuarios").findOne({ usuario: usuario }, { usuario: 1, nombre: 1, contraseña: 1},
        (err, doc) => {
            if(err){
                return done("Error en la db: "+err, false);
            }else if(!doc){
                return done("El usuario no existe", false);
            }
            if(validarClave(contraseña, doc.contraseña)){
                return done(null,{nombre: doc.nombre, usuario: doc.usuario});
            }
            else{
                return done("Contraseña incorrecta",false);
            }
        });
    }));

    function validarClave(contraseña, hash){
		return bcrypt.compareSync(contraseña, hash);
	};

	function crearHash(contraseña){
		return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(10), null);
	};
};