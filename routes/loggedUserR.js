const express = require('express'); //import express

const router = express.Router();

const userController = require('../controllers/loggedUserC');

router.get('/getDatiUtente/:username', userController.getDatiUtente); //datiUtente

router.get('/getStatisticheUtente/:username', userController.getStatisticheUtente);

router.patch('/setNuovaEmail/:username/:email', userController.setNuovaEmail);

router.patch('/setNuovaPassword/:username/:password', userController.setNuovaPassword);

router.patch('/upgradePremium/:username', userController.upgradePremium);

router.patch('/setDailyChallengePlayed/:username', userController.setDailyChallengePlayed);

router.patch('/aggiornaPunteggio/:username/:punteggio', userController.aggiornaPunteggio);


module.exports = router; // export to use in server.js
