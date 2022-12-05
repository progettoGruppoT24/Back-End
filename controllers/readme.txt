qui ci saranno le IMPLEMENTAZIONI delle API

in ognuno dei file ci sarà:

const <nomeModello> = require('../models/<nomeModello>');


const <nomeMetodo> = (req, res) => {    
    //req = richiesta, quindi con eventuali parametri in input
        es: nomeUtente = req.body.username
    //res = risposta, quindi quello che restituirò in output
        es: res.json(risultatoQueryDB)  //Sarebbe un return
    <metodo>
};

es query db:

<nomeModello>.findOne({ <valoreDaCercare> }, (err, data) => {
    //findOne per trovare un elemento nel DB (credo il primo, il prof non si è ben spiegato)

    if(!data){
        //non ha trovato nulla
        <cosaFareSeNonTrovaNulla>
    }
    else{
        if(err){
            //errore nella ricerca (es query sbagliata)
            <cosaFareSeErrore>
        }
        else{
            //ha trovato quello che cercava
            <cosaFareSeTrovaQualcosa>
        }
    }
});

--------------------------------------------------------------------------

<nomeModello>.save((err, data) => {
    if(err){
        //errore nell'inserimento
        return res.json({Error err})
    }
    else{
        //inserimento andato a buon fine
        return res.json(data)  
    }
    
})


//export controller functions
module.exports = {
    getAllTea,
    newTea,
    deleteAllTea,
    getOneTea,
    deleteOneTea
};