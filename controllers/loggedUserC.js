const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const user = require('../models/userM');
const nodemailer = require('nodemailer');


//Elenco query con mongoose -> https://mongoosejs.com/docs/api.html#Mongoose
//INSERIRE TUTTI GLI STATUS DI RETURN (ES 404 NOT FOUNT, 200 OK, ...)

const getDatiUtente = (req, res) => {        
    let username = req.params.username; //Prendi l'username per il quale filtrare, preso dall'URL anzichè dal body del json
    //console.log(req.params.username);
    //Trova l'user con l'username voluto
    //Per restituire anche la password, aggiungerla tra gli apici del findOne
    user.findOne({ username: username }, 'username email nation isPremium', (err, data) => {
        if (err || !data) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'User not found',
                dati: null
            });
        }
        else return res.json({
            success: true,
            statusCode: 200,
            message: "Here is the user's data",
            dati: data
        });
    });
};

const getCredenziali = (req, res) => {    

    let email = req.params.email; //Prendi l'username per il quale filtrare, preso dall'URL anzichè dal body del json

    console.log("Cerco utente con email = " + email);

    user.findOne({ email: email }, 'username password', (err, data) => {
        if (err || !data) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'The searched e-mail does not exist.',
                dati: null
            });
        }
        else return res.json({
            success: true,
            statusCode: 200,
            message: "Here are the required credentials",
            dati: data
        });
    });
};

const getStatisticheUtente = (req, res) => {
    let username = req.params.username; //Prendi l'username per il quale filtrare, preso dall'URL anzichè dal body del json
    //console.log(req.params.username);
    //Trova l'user con l'username voluto
    user.findOne({ username: username }, 'statisticheUtente', (err, data) => {
        if (err || !data) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'User not found',
                dati: null
            });
        }
        else return res.json({
            success: true,
            statusCode: 200,
            message: "Here are the required statistics",
            dati: data
        });
    });
};


const setNuovaEmail = (req, res) => {
    user.findOneAndUpdate({ username: req.params.username }, { $set: {email: req.params.email} }, { new: true }, (err, newEmail) => {
        if (err) {
            return res.json({
                success: false,
                statusCode: 304,
                message: 'It was not possible to update the e-mail'
            });
        } else {
            res.json({
                success: true,
                statusCode: 200,
                message: "Email updated."
            })
        }
    });
}

const setNuovaPassword = (req, res) => {

    user.findOne({ username: req.params.username }, 'password', (err, data) => {
        if (err || !data) {
            return res.json({
                success: false,
                statusCode: 404,
                message: 'User not found',
                dati: null
            });
        }
        else{
            if(data.password == req.body.vecchiaPassword){
                user.findOneAndUpdate({ username: req.params.username }, { $set: {password: req.params.password} }, { new: true }, (err, newPass) => {
                    if (err) {
                        return res.json({
                            success: false,
                            statusCode: 304,
                            message: 'It was not possible to update the password'
                        });
                    } else {
                        return res.json({
                            success: true,
                            statusCode: 200,
                            message: "Password updated"
                        })
                    }
                });
            }
            else{
                return res.json({
                    success: true,
                    statusCode: 403,
                    message: "The old password and the new one do not match.",
                    dati: null
                })
            }
        } 
    });


    
}


const sendEmail = (req, res) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'japanguesser@gmail.com',
            pass: 'krroiormalitezpo'
        }
    });
    
    let mailDetails = {
        from: 'japanguesser@gmail.com',
        to: req.body.destinatario,                    //'lorenzo.dambro@gmail.com',
        subject: req.body.titolo,
        text: req.body.testo
    };
    
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            return res.json({
                success: false, 
                statusCode: 502,
                message: 'Error' 
            });
        } else {
            res.json({
                success: true,
                statusCode: 200,
                message: 'Email sent'
            });
        }
    });
}

const upgradePremium = (req, res) => {
    user.findOneAndUpdate({ username: req.params.username }, { $set: {isPremium: true} }, { new: true }, (err, newPass) => {
        if (err) {
            return res.json({ 
                success: false,
                statusCode: 304,
                message: 'It was not possible to upgrade the user'
            });
        } else {
            return res.json({
                success: true,
                statusCode: 200,
                message: `The user is now a premium user`
            });
        }
    });
}

const setDailyChallengePlayed = (req, res) => {
    user.findOne({ username: req.params.username }, 'username hasPlayedDailyChallenge', (err, data) => {
        if (err || !data) {
            return res.json({
                success: false, 
                statusCode: 404,
                message: 'User not found'
            });
        }
        else{
            if(data.hasPlayedDailyChallenge)
                return res.json({
                    success: true,
                    statusCode: 200,
                    message: "already_played"
                });
            else{
                user.findOneAndUpdate({ username: req.params.username }, { $set: {hasPlayedDailyChallenge: true} }, { new: true }, (err, result) => {
                    if (err) {
                        return res.json({ 
                            success: false,
                            statusCode: 304,
                            message: 'The status of the daily challenge could not be updated'
                        });
                    }
                    else {
                        res.json({
                            success: true,
                            statusCode: 200,
                            message: `User has played daily challenge`
                        });
                    }
                });
            }
        }
    });
}

const aggiornaPunteggioTraining = (req, res) => {
    var username = req.params.username;
    var punteggio = req.params.punteggio;
    user.findOne({ username: req.params.username }, 'statisticheUtente', (err, stats) => {
        if (err || !stats) { //se il giocatore non esiste (non viene trovato)
            return res.json({
                success: false,
                statusCode: 404,
                message: `User not found`
            });
        } else {
            if(stats.statisticheUtente.punteggioTraining<punteggio){
                user.findOneAndUpdate({ username: req.params.username }, { $set: {"statisticheUtente.punteggioTraining": punteggio } }, { new: true }, (err, newPunt) => {
                    if (err) { //se c'è stato un errore nel aggiornare le statistiche dell'utente
                        return res.json({ 
                            success: false,
                            statusCode: 304,
                            message: 'The player statistics could not be updated'
                        });
                    } else {
                        return res.json({  //statistiche aggiornate con successo
                            success: true,
                            statusCode: 200,
                            message: 'Score updated'
                        });
                    }
                });
            }
            else
                return res.json({  //successo, ma non era necessario aggiornare le statistiche
                            success: true,
                            statusCode: 200,
                            message: 'Score not updated'
                        });
        }
    });
}

const aggiornaStatsSfidaGiornaliera = (req, res) => {
    var username = req.params.username;
    var result = req.params.result;
    user.findOne({ username: username }, 'statisticheUtente', (err, stats) => {
        if (err || !stats) {
            return res.json({ 
                success: false,
                statusCode: 404,
                message: 'User not found'
            });
        } else {
            var giocate = stats.statisticheUtente.sfideGiornaliereGiocate+1;
            var vinte = stats.statisticheUtente.sfideGiornaliereVinte+1;
            if(result=="sfidaVinta"){
                stats.sfideGiornaliereGiocate++;
                console.log("true");
                user.findOneAndUpdate({ username: username }, { $set: {"statisticheUtente.sfideGiornaliereGiocate": giocate,  "statisticheUtente.sfideGiornaliereVinte": vinte} }, { new: true }, (err, newPunt) => {
                    if (err) {
                        return res.json({ 
                            success: false,
                            statusCode: 304,
                            message: 'The player statistics could not be updated'
                        });
                    } else {
                        return res.json({
                            success: true,
                            statusCode: 200,
                            message: 'Score updated'
                        });
                    }
                });
            }
            else{
                console.log("false");
                user.findOneAndUpdate({ username: req.params.username }, { $set: {"statisticheUtente.sfideGiornaliereGiocate": giocate} }, { new: true }, (err, newPunt) => {
                    if (err) {
                        return res.json({ 
                            success: false,
                            statusCode: 304,
                            message: 'The player statistics could not be updated'
                        });
                    } else {
                        return res.json({
                            success: true,
                            statusCode: 200,
                            message: 'Score updated'
                        });
                    }
                });
            }
        }
    });
}

//export controller functions
module.exports = {
    getDatiUtente,
    getCredenziali,
    getStatisticheUtente,
    sendEmail,
    setNuovaEmail,
    setNuovaPassword,
    upgradePremium,
    setDailyChallengePlayed,
    aggiornaPunteggioTraining,
    aggiornaStatsSfidaGiornaliera
};
