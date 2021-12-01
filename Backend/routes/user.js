const express = require('express');

// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();

// On associe les fonctions aux différentes routes, on importe le controller
const userCtrl = require('../constollers/user');

router.post('/signup', userCtrl.signup);// Crée un nouvel utilisateur
router.post('/login', userCtrl.login);// Connecte un utilisateur


module.exports = router;
