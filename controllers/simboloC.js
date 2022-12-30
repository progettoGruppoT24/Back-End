const { collection } = require('../models/simboloM');
const Simbolo = require('../models/simboloM');
const Quiz = require('../models/quizM');

//Elenco query con mongoose -> https://mongoosejs.com/docs/api.html#Mongoose
//INSERIRE TUTTI GLI STATUS DI RETURN (ES 404 NOT FOUNT, 200 OK, ...)

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

async function chooseRandomSimbolo (alf) {
    var random = Math.floor(Math.random() * await Simbolo.count({alfabeto: alf}).exec());
    var res = await Simbolo.findOne({alfabeto: alf}).skip(random).exec();
    return res;
}

async function  generaQuiz (req, res) {
    var alfabeti;
    try{
        alfabeti = JSON.parse(req.query.alfabeto);
    }
    catch(e){
        return res.json({
            success: false,
            statusCode: 400,
            message: 'Alphabet error'
        });
    }
    var indiceAlfabetoScelto = Math.floor(Math.random() * (alfabeti.length));
    
    var tipo = Math.floor(Math.random() * 3) + 1;
    var domanda = "NULL";
    var alfabeto = alfabeti[indiceAlfabetoScelto];
    var opzione = [];
    var soluzione = "NULL";
    
    //console.log("alfabeto: " + alfabeti[indiceAlfabetoScelto] + " tipo: " + tipo);
    try{
        if(tipo===1){
            var simbolo = await chooseRandomSimbolo(alfabeti[indiceAlfabetoScelto]);
            domanda = simbolo.carattereGiapponese;
            soluzione = simbolo.valore;
        }
        else if(tipo===2){
            var simbolo = await chooseRandomSimbolo(alfabeti[indiceAlfabetoScelto]);
            domanda = simbolo.valore;
            soluzione = simbolo.carattereGiapponese;
            opzione.push(simbolo.carattereGiapponese);
            
            simbolo = await chooseRandomSimbolo(alfabeti[indiceAlfabetoScelto]);
            opzione.push(simbolo.carattereGiapponese);
            
            simbolo = await chooseRandomSimbolo(alfabeti[indiceAlfabetoScelto]);
            opzione.push(simbolo.carattereGiapponese);
            
            simbolo = await chooseRandomSimbolo(alfabeti[indiceAlfabetoScelto]);
            opzione.push(simbolo.carattereGiapponese);
        }
        else{
            var simbolo = await chooseRandomSimbolo(alfabeti[indiceAlfabetoScelto]);
            domanda = simbolo.carattereGiapponese;
            soluzione = simbolo.valore;
            opzione.push(simbolo.valore);
            
            simbolo = await chooseRandomSimbolo(alfabeti[indiceAlfabetoScelto]);
            opzione.push(simbolo.valore);
            
            simbolo = await chooseRandomSimbolo(alfabeti[indiceAlfabetoScelto]);
            opzione.push(simbolo.valore);
            
            simbolo = await chooseRandomSimbolo(alfabeti[indiceAlfabetoScelto]);
            opzione.push(simbolo.valore);
        }
    }
    catch(e){
        return res.json({
            success: false,
            statusCode: 500,
            message: 'Error in generating the quiz'
        });
    }
    
    shuffle(opzione);
    
    const newQuiz = new Quiz ({
        tipo: tipo,
        domanda: domanda,
        alfabeto: alfabeto,
        opzione: opzione,
        soluzione: soluzione
    });
    
    return res.json({
        success: true,
        statusCode: 200,
        message: 'Quiz generated successfully',
        newQuiz
    });
}


//export controller functions
module.exports = {
    generaQuiz
};
