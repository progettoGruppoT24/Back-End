const mongoose = require("mongoose"); //import mongoose

const quizSchema = new mongoose.Schema({
    tipo: {type: Number},
    domanda: {type: String},
    alfabeto: {type: String},
    opzione: [{type: String}],
    soluzione: {type: String}
});

const Quiz = mongoose.model('quiz', quizSchema); 

module.exports = Quiz;
