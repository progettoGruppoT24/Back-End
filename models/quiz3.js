
const mongoose = require("mongoose"); //import mongoose

const quiz3Schema = new mongoose.Schema({
    alphabet: {type:Int /* nota in basso*/ },
    image: {type:String /* String o png */},
    description1: {type:String},
    description2: {type:String},
    description3: {type:String},
    description4: {type:String},
    answer: {type:Int}  
    /* Il numero della descrizione, se le passiamo già randomizzate, 
        sennò si può fare che di default la prima è corretta e passare un parametro in meno */
});

const Quiz3 = mongoose.model('Quiz3', quiz3Schema); //convert to model named User

module.exports = Quiz3; //export for controller use


/*
Alfabeto:
1 - Solo Katakana
2 - Solo Hiragana
3 - Solo Kanji
4 - Katakana + Hiragana
5 - Tutti e 3
*/