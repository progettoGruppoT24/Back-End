//const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const user = require('../models/userM');

const signUp = (req, res) => {
    
    //Viene verificato che sia presente tale user, filtrando per username, non potranno esserci duplicati
    user.findOne({ username: req.body.username }, (err, data) => {   //User.findOne è una query nel DB

        //Non ci sono utenti con quell'username, è possibile inserire il nuovo utente
        if (!data) {
            //Viene creato un nuovo username
            //DA MODIFICARE I PARAMETRI IN BASE ALLO SCHEMA DI models/user.js, VA MODIFICATO ANCHE IL BODY SU POSTMAN
            const newUser = new user({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                nation: req.body.nation
            })

            // Viene salvato l'user nel database
            newUser.save((err, data) => {
                if (err) return res.json({
                    success: false,
                    statusCode: 500,
                    message: 'Error in saving the user',
                    dati: null
                });
                return res.json({
                    success: true,
                    statusCode: 200,
                    message: 'User successfully inserted',
                    dati: data
                });
            })
            
        } else {
            if (err) {
                return res.json({
                    success: false,
                    statusCode: 404,
                    message: 'User not found',
                    dati: null
                });
            }
            //Se c'è l'username è già presente
            return res.json({
                success: true,
                statusCode: 403,
                message: 'User already in use',
                dati: null
            });
        }
    })
};

const authentication = async function (req, res) {
    /* CREDO che res.json equivalga a return (anche se a me sembrava si dovesse fare return res.json...) */
	
	//Per prima cosa si cerca se l'utente esiste, verificando che l'username sia presente nel db
	let data = await user.findOne({	username: req.body.username }).exec();

	// Nel caso l'utente non venga trovato
	if (!data) {
		return res.json({
            success: false,
            statusCode: 404,
            message: 'User not found',
            dati: null
        });
	}
    else{
        // Nel caso venga trovato un utente, si verifica che la password sia quella corretta
        if (data.password != req.body.password) {
            return res.json({
                success: true,
                statusCode: 403,
                message: 'Password does not match',
                dati: null
            });
        }
        else{
            /*
            // Se non ci siamo fermati sopra, vuol dire che l'utente è autenticato correttamente, quindi gli assegno un token
            var payload = {
                id: data._id,
                username: data.username,
                email: data.email,
                isPremium: data.isPremium
                //other_data: encrypted_in_the_token	
            }

            var options = {
                expiresIn: 86400 // expires in 24 hours
            }

            //Genero l'effettivo token, passandogli i dati sopraelencati e un valore salvato nel .env, oltre all'opzione di scadenza del token
            //console.log("La chiave è = " + process.env.SUPER_SECRET);
            var token = jwt.sign(payload, process.env.SUPER_SECRET, options);   //process.env.SUPER_SECRET

            */

            //localStorage.setItem("username", data.username);

            return res.json({
                id: data._id,
                username: data.username,
                isPremium: data.isPremium,
                hasPlayedDailyChallenge: data.hasPlayedDailyChallenge,
                success: true,
                statusCode: 200,
                message: 'Enjoy your token!',
                //token: token,   //Una stringa criptata da jwt
            });
        }
    }	
};

//Restituisci tutti gli user
const getClassifica = (req, res) => {
    user.find({}, 'username nation statisticheUtente', (err, data) => {
        if (err) {
            return res.json({
                success: false,
                statusCode: 500,
                message: 'Error no data',
                dati: null
            });
        }
        return res.json({
            success: true,
            statusCode: 200,
            message: "Returned the user's ranking data.",
            Classifica: data
        });
    }).sort({"statisticheUtente.punteggioTraining": -1});
};

const getGiocatoreClassifica = (req, res) => {
    let username = req.params.username; //Prendi l'username per il quale filtrare, preso dall'URL anzichè dal body del json

    //Trova l'user con l'username voluto
    user.findOne({ username: username }, 'username nation statisticheUtente', (err, data) => {
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
                message: "Returned the user's ranking data.",
                dati: data
            });
    });
};

//export controller functions
module.exports = {
    signUp,
    authentication,
    getClassifica,
    getGiocatoreClassifica
};


