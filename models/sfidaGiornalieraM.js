const mongoose = require("mongoose"); //import mongoose

const sfidaGiornalieraSchema = new mongoose.Schema({
    tipoDiSfida: {type:Number, required:true},
    data: {type:Date, required:true, unique:true, default: Date.now()},
    listaDiQuiz: [{}]
});

const sfidaGiornaliera = mongoose.model('sfidaGiornaliera', sfidaGiornalieraSchema);

module.exports = sfidaGiornaliera;
