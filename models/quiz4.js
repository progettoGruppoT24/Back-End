
const mongoose = require("mongoose"); //import mongoose

const quiz4Schema = new mongoose.Schema({
    alphabet: {type:Int /* nota in basso*/ },
    description: {type:String},
    answer: {type:String /* String o png */},
});

const Quiz4 = mongoose.model('Quiz4', quiz4Schema); //convert to model named User

module.exports = Quiz4; //export for controller use


/*
Alfabeto:
1 - Solo Katakana
2 - Solo Hiragana
3 - Solo Kanji
4 - Katakana + Hiragana
5 - Tutti e 3
*/