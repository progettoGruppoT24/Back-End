
const mongoose = require("mongoose"); //import mongoose

const quiz1Schema = new mongoose.Schema({
    alphabet: {type:Int /* nota in basso*/ },
    image: {type:String /* String o png */ },
    answer: {type:String}
});

const Quiz1 = mongoose.model('Quiz1', quiz1Schema); //convert to model named User

module.exports = Quiz1; //export for controller use


/*
Alfabeto:
1 - Solo Katakana
2 - Solo Hiragana
3 - Solo Kanji
4 - Katakana + Hiragana
5 - Tutti e 3
*/