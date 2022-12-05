const express = require('express'); //import express


const router = express.Router();

const userController = require('../controllers/user');




router.post('/user', userController.newUser);   //OK

router.get('/user', userController.getAllUser); //OK

router.delete('/user', userController.deleteAllUser); //OK

router.get('/user/:username', userController.getOneUserByUsername); //OK
//per passare più parametri -> router.get('/user/:username:email:altroParametro', ...);

router.get('/user/:email', userController.getOneUserByEmail);   //NON SO COME FAR CAPIRE CHE VIENE PASSATO UN INDIRIZZO MAIL

router.delete('/user/:username', userController.deleteOneUser); //OK


module.exports = router; // export to use in server.js