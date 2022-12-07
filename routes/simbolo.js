const express = require('express'); //import express

const router = express.Router();

const userController = require('../controllers/user');

router.get('/generaQuiz', userController.getClassifica); //classifica

module.exports = router; // export to use in server.js
