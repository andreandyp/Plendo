var mongoose = require("mongoose");

var Usuario = new mongoose.Schema({
    nombre: String,
    usuario: String,
    contraseña: String,
    fechaHora: {type: Date, default: Date.now}
});

mongoose.model("Usuario",Usuario);