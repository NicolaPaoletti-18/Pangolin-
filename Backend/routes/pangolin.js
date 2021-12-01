const express = require("express");

// Appel du routeur avec la méthode mise à disposition par Express
const router = express.Router();


// On associe les fonctions aux différentes routes, on importe le controller
const pangolinCtrl = require('../constollers/pangolin');

// On importe le middleware auth pour sécuriser les routes
const auth = require('../middleware/auth');






router.post('/',auth,  pangolinCtrl.PostPangolin );
router.put('/:id', auth,  pangolinCtrl.ModifyPangolin);
router.delete('/:id',auth,  pangolinCtrl.DeletePangolin);
router.get('/:id', auth,  pangolinCtrl.getOnePangolin);
router.use('/', auth,  pangolinCtrl.getAllPangolin);




module.exports =  router;