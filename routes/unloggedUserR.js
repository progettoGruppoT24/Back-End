const express = require('express'); //import express

const router = express.Router();

const unloggedUserController = require('../controllers/unloggedUserC');

router.post('/signUp', unloggedUserController.signUp);   //signUp

router.post('/login', unloggedUserController.authentication);    //login

router.get('/getClassifica', unloggedUserController.getClassifica); //classifica

router.get('/getGiocatoreClassifica/:username', unloggedUserController.getGiocatoreClassifica); //getGiocatoreClassifica




module.exports = router; // export to use in server.js
