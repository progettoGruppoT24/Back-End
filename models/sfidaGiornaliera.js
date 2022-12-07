const mongoose = require("mongoose"); //import mongoose

const quizSchema = new mongoose.Schema({
    tipo: {type: Number},
    domanda: {type: String},
    alfabeto: {type: String},
    opzione1: {type: String},
    opzione2: {type: String},
    opzione3: {type: String},
    opzione4: {type: String},
    soluzione: {type: String}
});

const sfidaGiornalieraSchema = new mongoose.Schema({
    tipoDiSfida: {type:Number, required:true},
    data: {type:Date, required:true, unique:true, default: Date.now()},
    listaDiQuiz: [{quiz: {type: quizSchema}}]
});

const SfidaGiornaliera = mongoose.model('sfidaGiornaliera', sfidaGiornalieraSchema); //convert to model named User

module.exports = SfidaGiornaliera; //export for controller use
