"use strict";

var MongoClient = require("mongodb").MongoClient,
	base;

function conectar(url){
	MongoClient.connect(url, (err, client) => {
		if (err){
			return console.error(err);
		}
		console.log("Conexión exitosa a la base");
		base = client.db("plendo");
	});
}

module.exports = {
	conectar,
	get(){
		return base;
	}
};