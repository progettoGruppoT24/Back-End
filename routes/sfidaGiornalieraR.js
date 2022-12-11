const express = require('express'); //import express

const router = express.Router();

const userController = require('../controllers/sfidaGiornalieraC');

router.get('/getSfidaGiornaliera', userController.getSfidaGiornaliera); 

module.exports = router; // export to use in server.js
