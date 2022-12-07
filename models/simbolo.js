const mongoose = require("mongoose"); //import mongoose

const simboloSchema = new mongoose.Schema({
    carattereGiapponese: {type:String, required:true, unique:true, dropDups:true},
    valore: {type:String, required:true},
    alfabeto: {type:String, required:true}
});

const simboloAlfabeto = mongoose.model('simbolo', simboloSchema); 

module.exports = simboloAlfabeto; //export for controller use
