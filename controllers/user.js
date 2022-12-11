const { collection } = require('../models/user');
const User = require('../models/user');

//Elenco query con mongoose -> https://mongoosejs.com/docs/api.html#Mongoose
//INSERIRE TUTTI GLI STATUS DI RETURN (ES 404 NOT FOUNT, 200 OK, ...)

const signUp = (req, res) => {
    
    //Viene verificato che sia presente tale user, filtrando per username, non potranno esserci duplicati
    User.findOne({ username: req.body.username }, (err, data) => {   //User.findOne è una query nel DB

        //Non ci sono utenti con quell'username, è possibile inserire il nuovo utente
        if (!data) {
            //Viene creato un nuovo username
            //DA MODIFICARE I PARAMETRI IN BASE ALLO SCHEMA DI models/user.js, VA MODIFICATO ANCHE IL BODY SU POSTMAN
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                nation: req.body.nation,
                isPremium: req.body.isPremium,
                hasPlayedDailyChallenge: req.body.hasPlayedDailyChallenge,
                statisticheUtente: req.body.statisticheUtente
            })

            // Viene salvato l'user nel database
            newUser.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.json({"Inserito utente: " : data});
            })
            
        } else {
            if (err) {
                //Se c'è un errore nella query
                return res.json('Errore nella query. ${err}');
            }
            //Se c'è l'username è già presente
            return res.json({ message: "Username già in uso" });
        }
    })
};

//Restituisci tutti gli user
const getClassifica = (req, res) => {
    User.find({}, 'username nation statisticheUtente', (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json({"Classifica": data });
    }).sort({"statisticheUtente.punteggioTraining": -1});
};

const getGiocatoreClassifica = (req, res) => {
    let username = req.params.username; //Prendi l'username per il quale filtrare, preso dall'URL anzichè dal body del json

    //Trova l'user con l'username voluto
    User.findOne({ username: username }, 'username nation statisticheUtente', (err, data) => {
        if (err || !data) {
            return res.json({ message: "L'utente cercato non esiste." });
        }
        else return res.json(data); 
    });
};

const getDatiUtente = (req, res) => {
    let username = req.params.username; //Prendi l'username per il quale filtrare, preso dall'URL anzichè dal body del json
    console.log(req.params.username);
    //Trova l'user con l'username voluto
    User.findOne({ username: username }, 'username email nazione isPremium', (err, data) => {
        if (err || !data) {
            return res.json({ message: "L'utente cercato non esiste." });
        }
        else return res.json(data); 
    });
};

const getStatisticheUtente = (req, res) => {
    let username = req.params.username; //Prendi l'username per il quale filtrare, preso dall'URL anzichè dal body del json
    console.log(req.params.username);
    //Trova l'user con l'username voluto
    User.findOne({ username: username }, 'statisticheUtente', (err, data) => {
        if (err || !data) {
            return res.json({ message: "L'utente cercato non esiste." });
        }
        else return res.json(data); 
    });
};

const setNuovaEmail = (req, res) => {
    User.findOneAndUpdate({ username: req.params.username }, { $set: {email: req.params.email} }, { new: true }, (err, newEmail) => {
        if (err) {
            return res.json({ message: "Errore" });
        } else {
            res.send({
                statusCode: 200,
                message: `Email changed.`
            })
        }
    });
}

const setNuovaPassword = (req, res) => {
    User.findOneAndUpdate({ username: req.params.username }, { $set: {password: req.params.password} }, { new: true }, (err, newPass) => {
        if (err) {
            return res.json({ message: "Errore" });
        } else {
            res.send({
                statusCode: 200,
                message: `Password changed.`
            })
        }
    });
}

const upgradePremium = (req, res) => {
    User.findOneAndUpdate({ username: req.params.username }, { $set: {isPremium: true} }, { new: true }, (err, newPass) => {
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
    User.findOneAndUpdate({ username: req.params.username }, { $set: {hasPlayedDailyChallenge: true} }, { new: true }, (err, result) => {
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
    User.findOne({ username: req.params.username }, 'statisticheUtente', (err, stats) => {
        if (err) {
            return res.json({ message: "Errore" });
        } else {
            if(stats.statisticheUtente.punteggioTraining<punteggio){
                User.findOneAndUpdate({ username: req.params.username }, { $set: {"statisticheUtente.punteggioTraining": punteggio } }, { new: true }, (err, newPunt) => {
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
    signUp,
    getClassifica,
    getGiocatoreClassifica,
    getDatiUtente,
    getStatisticheUtente,
    setNuovaEmail,
    setNuovaPassword,
    upgradePremium,
    setDailyChallengePlayed,
    aggiornaPunteggio
};
