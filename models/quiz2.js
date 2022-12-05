
const mongoose = require("mongoose"); //import mongoose

const quiz2Schema = new mongoose.Schema({
    alphabet: {type:Int /* nota in basso*/ },
    description: {type:String},
    image1: {type:String /* String o png */ },
    image2: {type:String /* String o png */ },
    image3: {type:String /* String o png */ },
    image4: {type:String /* String o png */ },
    answer: {type:Int}  
    /* Il numero dell'immagine, se li passiamo già randomizzati, 
        sennò si può fare che di default la prima è corretta e passare un parametro in meno */
});

const Quiz2 = mongoose.model('Quiz2', quiz2Schema); //convert to model named User

module.exports = Quiz2; //export for controller use


/*
Alfabeto:
1 - Solo Katakana
2 - Solo Hiragana
3 - Solo Kanji
4 - Katakana + Hiragana
5 - Tutti e 3
*/