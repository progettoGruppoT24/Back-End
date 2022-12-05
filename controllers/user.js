const { collection } = require('../models/user');
const User = require('../models/user');

//Elenco query con mongoose -> https://mongoosejs.com/docs/api.html#Mongoose
//INSERIRE TUTTI GLI STATUS DI RETURN (ES 404 NOT FOUNT, 200 OK, ...)

const newUser = (req, res) => {
    
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
                loggedWithGoogle: req.body.loggedWithGoogle,
                premiumUser: req.body.premiumUser  //Di default false? Uno non crea un account già premium
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
const getAllUser = (req, res) => {
    User.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json({"Elenco utenti ": data });
    })
};

//DELETE user
const deleteAllUser = (req, res) => {
    User.deleteMany({}, err => {    //Query per eliminare alcuni record (credo)
        if (err) {
            return res.json({ message: "Errore nell'eliminazione degli utenti" });
        }
        return res.json({ message: "Utenti eliminati con successo" });
    })
};


const getOneUserByUsername = (req, res) => {
    let username = req.params.username; //Prendi l'username per il quale filtrare, preso dall'URL anzichè dal body del json

    //Trova l'user con l'username voluto
    User.findOne({ username: username }, (err, data) => {
        if (err || !data) {
            return res.json({ message: "L'utente cercato non esiste." });
        }
        else return res.json({"Utente cercato " : data}); //Restituisce l'utente
    });
};


const getOneUserByEmail = (req, res) => {
    let email = req.params.email; //Prendi l'email per il quale filtrare

    //Trova l'user con l'username voluto
    User.findOne({ email: email }, (err, data) => {
        if (err || !data) {
            return res.json({ message: "L'utente cercato non esiste." });
        }
        else return res.json(data); //Restituisce l'utente
    });
};


//DELETE '/user/:name'
const deleteOneUser = (req, res, next) => {

    const result = User.deleteOne({username: req.params.username}, (err, collection) => {
        if (err) {
            throw err;
        }
        else {
            if(collection.deletedCount == 0){
                res.json("Utente inesistente");
            }
            else{
                res.json({ "Eliminato utente: " : req.params.username });
            }
            
        }
    });

};


//export controller functions
module.exports = {
    newUser,
    getAllUser,
    deleteAllUser,
    getOneUserByUsername,
    getOneUserByEmail,
    deleteOneUser
};