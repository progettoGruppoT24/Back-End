qui dentro ci saranno tutte le DICHIARAZIONI dei metodi/API del backend

in ognuno dei file ci sarà:

const express = require('express'); //importa la libreria express

const router = express.Router();

const <nomeController> = require('../controllers/<nomeFileController>');

router.<post/get/delete/...>('<path>', <nomeController>.<nomeAPI>);
....

module.exports = router; // per permettere alle altre classi di utilizzare le routes