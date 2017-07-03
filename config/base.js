var MongoClient = require("mongodb").MongoClient;
const url = process.env.BASE_URL;
var base;

module.exports = {
    conectar() {
        MongoClient.connect(url, (err, db) => {
            if (err)
                return console.error(err)
            console.log("Conexión exitosa a la base");
            base = db;
        });
    },
    get(){
        return base;
    }
}