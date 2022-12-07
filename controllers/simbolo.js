const { collection } = require('../models/simbolo');
const Simbolo = require('../models/simbolo');

//Elenco query con mongoose -> https://mongoosejs.com/docs/api.html#Mongoose
//INSERIRE TUTTI GLI STATUS DI RETURN (ES 404 NOT FOUNT, 200 OK, ...)



//export controller functions
module.exports = {
    signUp,
    getClassifica,
    getGiocatoreClassifica,
    getDatiUtente,
    getStatisticheUtente,
    setNuovaEmail,
    setNuovaPassword,
    upgradePremium
};
