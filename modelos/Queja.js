var mongoose = require("mongoose");

var Queja = new mongoose.Schema({
    texto: String,
    autor: String,
    fechaHora: { type: Date, default: Date.now}
});

mongoose.model("Queja",Queja);