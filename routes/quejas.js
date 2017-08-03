var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;

var db = require("../config/base");

//Si el usuario esta autentificado o hace un get a /quejas, puede pasar
//Si no, lo redirige a /
var middleware = function (req, res, next) {
    if (req.isAuthenticated() || req.method === "GET") {
        return next();
    } else {
        res.redirect("/");
    }
}
router.use("/", middleware);

//Obtener todas las quejas y publicarlas
router.get("/", (req, res) => {
    db.get().collection("usuarios").aggregate([{ $unwind: "$quejas" }, { $sort: { "quejas.fechaHora": -1 } }, { $project: { _id: 0, usuario: 1, nombre: 1, fechaHora: 1, "quejas._id": 1, "quejas.texto": 1, "quejas.fechaHora": 1 } }], (err, datos) => {
        res.send(datos);
    });
});
//Publicar quejas
router.post("/", (req, res) => {
    var nueva = {
        _id: new ObjectId(),
        texto: req.body.texto,
        fechaHora: new Date(Date.now())
    };
    db.get().collection("usuarios").updateOne({ usuario: req.user.usuario }, { $push: { quejas: nueva } }, (err, doc) => {
        if (err) {
            res.status(500).json({ mensaje: "Error en la db: " + err });
        } else {
            res.send(doc);
        }
    });
});

//Obtener quejas por ID y eliminarla
router.get("/:id", (req, res) => {
    db.get().collection("usuarios").findOne({ quejas: { $elemMatch: { _id: new ObjectId(req.params.id) } } }, { _id: 0, usuario: 1, nombre: 1, fechaHora: 1, "quejas.texto": 1, "quejas.fechaHora": 1, "quejas.$": 1 }, (err, queja) => {
        if (err) {
            res.status(500).json({ mensaje: "Error en la db: " + err });
        } else {
            res.json(queja);
        }
    });
});

/*queja.delete( (req,res) => {
    Queja.remove({_id:req.params.id},(err) => {
        if(err){
            res.status(500).json({mensaje: "Error en la db: "+err});
        }
    });
});*/

module.exports = router;