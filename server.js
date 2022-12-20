/* QUI VA TUTTO IL BACKEND, (le API vere e proprie saranno in /routes)
SI POTREBBE USARNE PIù DI UNO MA BUCCHIARONE CONSIGLIA DI USARNE SOLO UNO PER FACILITARCI LE COSE */



const dotenv = require('dotenv').config();  //per usare le variabili di ambiente
const express = require('express');         //importo express per comunicare col db e gestire il backend
const app = express();                      //dichiaro l'applicazione come tipo express
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');  //Specifico che la documentazione verrà fatta in json

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));    //Il prof andrà in api-docs per vedere la documentazione delle API


//const routes = require('./routes/tea');         // import the routes
const routesLoggedUser = require('./routes/unloggedUserR');  // import the routes
const routesUnloggedUser = require('./routes/loggedUserR');  // import the routes
const routesSimbolo = require('./routes/simboloR');  // import the routes
const routesSfidaGiornaliera = require('./routes/sfidaGiornalieraR');

const mongoose = require('mongoose');           //import della libreria per gestire il db
app.use(express.json());                        //permette di utilizzare una libreria di json e quindi file json
app.use(cors());
app.use('/', routesLoggedUser);                           //posso utilizzare tutto il codice all'interno della cartella routes
app.use('/', routesUnloggedUser);       
app.use('/', routesSimbolo);
app.use('/', routesSfidaGiornaliera);
//app.use('./routes/loggedUserR', tokenChecker);

//connessione al DB
mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

//attivo il server
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Server in ascolto sulla porta: ' + listener.address().port)
});


module.exports = app;
