const express = require('express'); //import express

const router = express.Router();

const userController = require('../controllers/simbolo');

router.get('/generaQuiz', userController.generaQuiz); 

module.exports = router; // export to use in server.js
