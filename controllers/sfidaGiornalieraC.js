const { collection } = require('../models/sfidaGiornalieraM');
const SfidaGiornaliera = require('../models/sfidaGiornalieraM');
const User = require('../models/userM');

//Elenco query con mongoose -> https://mongoosejs.com/docs/api.html#Mongoose
//INSERIRE TUTTI GLI STATUS DI RETURN (ES 404 NOT FOUNT, 200 OK, ...)

async function generaQuizSfidaGiornaliera(tipoSfida){
    var listaQuiz = [];
    try{
        if(tipoSfida==1){
            var response = await fetch('http://localhost:8080/generaQuiz?alfabeto=["Kanji"]');
            listaQuiz.push((await response.json()).newQuiz); //extract JSON from the http response
            response = await fetch('http://localhost:8080/generaQuiz?alfabeto=["Katakana"]');
            listaQuiz.push((await response.json()).newQuiz); 
            response = await fetch('http://localhost:8080/generaQuiz?alfabeto=["Katakana"]');
            listaQuiz.push((await response.json()).newQuiz); 
            response = await fetch('http://localhost:8080/generaQuiz?alfabeto=["Hiragana"]');
            listaQuiz.push((await response.json()).newQuiz); 
            response = await fetch('http://localhost:8080/generaQuiz?alfabeto=["Hiragana"]');
            listaQuiz.push((await response.json()).newQuiz); 
        }
        else{
            for(var i=1;i<=30;++i){
                var response = await fetch('http://localhost:8080/generaQuiz?alfabeto=["Kanji","Hiragana","Katakana"]');
                listaQuiz.push((await response.json()).newQuiz); 
            }
        }
    }
    catch(e){
        listaQuiz = null;
    }
    return listaQuiz;
}

async function getSfidaGiornaliera(req, res) {
    var data = await SfidaGiornaliera.findOne({}).exec();
    var tipoSfida = (Math.floor(Math.random() * 2) +1);
    var listaQuiz;
    var nuovaSfidaGiornaliera = new SfidaGiornaliera({
        tipoDiSfida: tipoSfida,
        data: Date.now()
    });
    if(data==null){ //non c'è nessuna sfida
        console.log("no data");
        listaQuiz = await generaQuizSfidaGiornaliera(tipoSfida);
        if(listaQuiz==null){
            return res.json({
                success: false,
                statusCode: 500,
                message: 'Error in generating the daily challenge',
                Sfida: null
            });
        }
        console.log(listaQuiz);
        nuovaSfidaGiornaliera.listaDiQuiz = listaQuiz;
        nuovaSfidaGiornaliera.save((err, data) => {
            if (err) return res.json({
                success: false,
                statusCode: 500,
                message: 'Error in saving the new challenge',
                Sfida: null
            });
            return res.json({
                success: true,
                statusCode: 200,
                message: 'New challenge created',
                Sfida: data
            });
        })
    }
    else{ //c'è una sfida
        console.log("si data");
        var dataCorrente = (new Date(Date.now())).toISOString().split('T')[0];
        var dataSfida = (data.data).toISOString().split('T')[0];
        if(dataCorrente!==dataSfida){ //la sfida non corrisponde alla data corrente
            console.log("devo cambiare sfida");
            var tmpRes = await SfidaGiornaliera.deleteMany({}).exec();
            if(!tmpRes){
                return res.json({
                    success: false,
                    statusCode: 500,
                    message: 'Error in deleting the old challenge',
                    Sfida: null
                });
            }
            tmpRes = User.updateMany({}, { hasPlayedDailyChallenge: false }).exec();
            if(!tmpRes){
                return res.json({
                    success: false,
                    statusCode: 500,
                    message: 'Error in updating the state of played daily challenge',
                    Sfida: null
                });
            }
            listaQuiz = await generaQuizSfidaGiornaliera(tipoSfida);
            if(listaQuiz==null){
                return res.json({
                    success: false,
                    statusCode: 500,
                    message: 'Error in generating the daily challenge',
                    Sfida: null
                });
            }
            nuovaSfidaGiornaliera.listaDiQuiz = listaQuiz;
            nuovaSfidaGiornaliera.save((err, data) => {
                if (err) return res.json({
                    success: false,
                    statusCode: 500,
                    message: 'Error in saving the new challenge',
                    Sfida: null
                });
                return res.json({
                    success: true,
                    statusCode: 200,
                    message: 'New challenge created',
                    Sfida: data
                });
            })
        }
        else{ //la sfida corrisponde alla data corrente
            console.log("sfida gia presente");
            return res.json({
                success: true,
                statusCode: 200,
                message: 'Challenge current date returned',
                Sfida: data
            });
        }
    }
}

//export controller functions
module.exports = {
    getSfidaGiornaliera
};
