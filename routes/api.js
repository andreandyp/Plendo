var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var Queja = mongoose.model("Queja");

var middleware = function(req,res,next){
    if(req.method === "GET" || req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/#iniciar");
    }
}
router.use("/quejas",middleware);

//Obtener todas las quejas y publicarlas
var quejas = router.route("/quejas");

quejas.get( (req,res) => {
    Queja.find( (err,datos) => {
        return res.send(datos);
    });
});

quejas.post( (req,res) => {
    var nueva = new Queja();
    nueva.texto = req.body.texto;
    nueva.autor = req.body.autor;

    nueva.save( (err,nueva) => {
        if(err){
            res.status(500).json({mensaje: "Error en la db: "+err});
        }else{
            res.send(nueva);
        }
    });
});

//Obtener quejas por ID y eliminarla
var queja = router.route("/quejas/:id");

queja.get( (req,res) => {
    Queja.findById(req.params.id,function(err,queja){
        if(err){
            res.status(500).json({mensaje: "Error en la db: "+err});
        }else{
            res.json(queja);
        }
    });
});

queja.delete( (req,res) => {
    Queja.remove({_id:req.params.id},(err) => {
        if(err){
            res.status(500).json({mensaje: "Error en la db: "+err});
        }
    });
});

module.exports = router;