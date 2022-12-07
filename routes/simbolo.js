const express = require('express'); //import express

const router = express.Router();

const userController = require('../controllers/simbolo');

//es richiesta: localhost:8080/generaQuiz?alfabeto=["Kanji","Hiragana","Katakana"]
router.get('/generaQuiz', userController.generaQuiz); 

module.exports = router; // export to use in server.js
