const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const user = require('../models/userM');

//Elenco query con mongoose -> https://mongoosejs.com/docs/api.html#Mongoose
//INSERIRE TUTTI GLI STATUS DI RETURN (ES 404 NOT FOUNT, 200 OK, ...)

const getDatiUtente = (req, res) => {    
    let username = req.params.username; //Prendi l'username per il quale filtrare, preso dall'URL anzichè dal body del json
    //console.log(req.params.username);
    //Trova l'user con l'username voluto
    user.findOne({ username: username }, 'username email nation password isPremium', (err, data) => {
        if (err || !data) {
            return res.json({success: false, message: "L'utente cercato non esiste.", dati: null });
        }
        else return res.json({success: true, messagge: "Ecco i dati richiesti", dati: data}); 
    });
};

const getStatisticheUtente = (req, res) => {
    let username = req.params.username; //Prendi l'username per il quale filtrare, preso dall'URL anzichè dal body del json
    //console.log(req.params.username);
    //Trova l'user con l'username voluto
    user.findOne({ username: username }, 'statisticheUtente', (err, data) => {
        if (err || !data) {
            return res.json({ success: false, message: "L'utente cercato non esiste.", dati: null});
        }
        else return res.json({success: true, messagge: "Ecco le statistiche richieste", dati: data}); 
    });
};


const setNuovaEmail = (req, res) => {
    user.findOneAndUpdate({ username: req.params.username }, { $set: {email: req.params.email} }, { new: true }, (err, newEmail) => {
        if (err) {
            return res.json({ success: false, message: "Errore" });
        } else {
            res.json({
                success: true,
                statusCode: 200,
                message: "Email changed."
            })
        }
    });
}

const setNuovaPassword = (req, res) => {
    user.findOneAndUpdate({ username: req.params.username }, { $set: {password: req.params.password} }, { new: true }, (err, newPass) => {
        if (err) {
            return res.json({ success: false, message: "Errore" });
        } else {
            res.send({
                success: true,
                statusCode: 200,
                message: `Password changed.`
            })
        }
    });
}


const upgradePremium = (req, res) => {
    user.findOneAndUpdate({ username: req.params.username }, { $set: {isPremium: true} }, { new: true }, (err, newPass) => {
        if (err) {
            return res.json({ message: "Errore" });
        } else {
            res.send({
                statusCode: 200,
                message: `User now is premium`
            })
        }
    });
}

const setDailyChallengePlayed = (req, res) => {
    user.findOneAndUpdate({ username: req.params.username }, { $set: {hasPlayedDailyChallenge: true} }, { new: true }, (err, result) => {
        if (err) {
            return res.json({ message: "Errore" });
        } else {
            res.send({
                statusCode: 200,
                message: `User has played daily challenge`
            })
        }
    });
}

const aggiornaPunteggio = (req, res) => {
    var username = req.params.username;
    var punteggio = req.params.punteggio;
    user.findOne({ username: req.params.username }, 'statisticheUtente', (err, stats) => {
        if (err) {
            return res.json({ message: "Errore" });
        } else {
            if(stats.statisticheUtente.punteggioTraining<punteggio){
                user.findOneAndUpdate({ username: req.params.username }, { $set: {"statisticheUtente.punteggioTraining": punteggio } }, { new: true }, (err, newPunt) => {
                    if (err) {
                        return res.json({ message: "Errore" });
                    } else {
                        res.send({
                            statusCode: 200,
                            message: `Punteggio updated`
                        })
                    }
                });
            }
            else
                return res.json({ message: "Punteggio not updated"});
        }
    });
}

//export controller functions
module.exports = {
    getDatiUtente,
    getStatisticheUtente,
    setNuovaEmail,
    setNuovaPassword,
    upgradePremium,
    setDailyChallengePlayed,
    aggiornaPunteggio
};
