var express = require("express");
var router = express.Router();

var db = require("../config/base");

router.get("/:usuario", (req,res) => {
    db.get().collection("usuarios").findOne({usuario: req.params.usuario}, {_id: 0, contraseña: 0, quejas: 0}, (err, resultado) => {
        if(resultado == null || err){
            return res.status(500).send(err || "Usuario no encontrado");
        }
        db.get().collection("usuarios").aggregate([
            {$match: {usuario: req.params.usuario}},
            {$unwind: "$quejas"},
            { $sort: { "quejas.fechaHora": -1 } },
            {$project: { _id: 0, quejas: 1}}
        ], (err, result) => {
            result.unshift(resultado);
            res.json(result);
        });
    });
});

module.exports = router;