qui andranno tutti i modelli dati dei vari oggetti
quindi tutte le struct con gli oggetti

const <nomeModello> = new mongoose.Schema({
    <nome>: {type: <tipo>, required: <bool>, ...},
    oppure
    <nome>: <tipo>,
    ...
});

AL TERMINE DEL FILE AGGIUNGERE SEMPRE

const <nomeOggetto> = mongoose.model('<nomeOggetto>', <nomeModello>);   //Converto l'oggetto in modello
module.exports = <nomeOggetto> ;    //esporto l'oggetto nelle classi esterne (es per i controllers)