var express = require("express");
var router = express.Router();

module.exports = (passport) => {

    //Verificar si un usuario ha iniciado sesión
    router.get("/exito",(req,res) => {
        res.json({usuario: req.user?req.user:null});
    });
    
    router.post("/iniciar",(req,res,next) => {
        passport.authenticate("iniciar",(err,usuario) => {
            if(!usuario){
                res.json({mensaje: err});
            }else{
                req.logIn(usuario,() => {
                    res.redirect("/autentificar/exito");
                });
            }
        })(req,res,next);
    });

    router.post("/registrar",(req,res,next) => {
        passport.authenticate("registrar",(err,usuario) => {
            if(!usuario){
                res.json({mensaje: err});
            }else{
                req.logIn(usuario,() => {
                    res.redirect("/autentificar/exito");
                });
            }
        })(req,res,next);
    });
    
    router.get("/salir",(req,res) => {
        req.destroy();
        req.logout();
        res.redirect("/");
    });

    return router;
}