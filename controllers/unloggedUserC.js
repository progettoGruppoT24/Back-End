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
                if (err) return res.json({ Error: err });
                return res.json({success: true, message: "Inserito utente: " + data});
            })
            
        } else {
            if (err) {
                //Se c'è un errore nella query
                return res.json({success: false, message: "Errore nella query. ${err}"});
            }
            //Se c'è l'username è già presente
            return res.json({success: false, message: "Username già in uso" });
        }
    })
};

const authentication = async function (req, res) {
    /* CREDO che res.json equivalga a return (anche se a me sembrava si dovesse fare return res.json...) */
	
	//Per prima cosa si cerca se l'utente esiste, verificando che l'username sia presente nel db
	let data = await user.findOne({	username: req.body.username }).exec();

	// Nel caso l'utente non venga trovato
	if (!data) {
		console.log("UTENTE NON TROVATO");
		res.json({ success: false, message: 'Authentication failed. User not found.' });
	}
    else{
        // Nel caso venga trovato un utente, si verifica che la password sia quella corretta
        if (data.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
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

            res.json({
                id: data._id,
                username: data.username,
                isPremium: data.isPremium,
                hasPlayedDailyChallenge: data.hasPlayedDailyChallenge,
                success: true,
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
            return res.json({ Error: err });
        }
        return res.json({"Classifica": data });
    }).sort({"statisticheUtente.punteggioTraining": -1});
};

const getGiocatoreClassifica = (req, res) => {
    let username = req.params.username; //Prendi l'username per il quale filtrare, preso dall'URL anzichè dal body del json

    //Trova l'user con l'username voluto
    user.findOne({ username: username }, 'username nation statisticheUtente', (err, data) => {
        if (err || !data) {
            return res.json({ message: "L'utente cercato non esiste." });
        }
        else return res.json(data); 
    });
};

//export controller functions
module.exports = {
    signUp,
    authentication,
    getClassifica,
    getGiocatoreClassifica
};


