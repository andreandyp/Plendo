var express = require("express");
var router = express.Router();

module.exports = (passport) => {

    //Verificar si un usuario ha iniciado sesión
    router.get("/exito",(req,res) => {
        res.json({usuario: req.user?req.user:null});
    });
    
    //Iniciar sesión
    router.post("/iniciar",(req,res,next) => {
        passport.authenticate("iniciar",(err,usuario) => {
            if(!usuario){
                res.json({error: err});
            }else{
                req.logIn(usuario,() => {
                    res.json(usuario);
                });
            }
        })(req,res,next);
    });

    //Registrar nuevo usuario
    router.post("/registrar",(req,res,next) => {
        passport.authenticate("registrar",(err,usuario) => {
            if(!usuario){
                res.json({error: err});
            }else{
                req.logIn(usuario,() => {
                    res.json(usuario);
                });
            }
        })(req,res,next);
    });

    //Cerrar sesión
    router.get("/salir",(req,res) => {
        req.logout();
        res.redirect("/");
    });

    return router;
}