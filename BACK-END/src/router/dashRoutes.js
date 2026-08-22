const express = require('express');
const router = express.Router();

const dashController = require('./../controller/dashController');
const upload = require('./../middlewares/filemiddleware');
const suppController = require('./../controller/suppController');

// Pour les formations
router.post('/formations',dashController.postFormations);
router.get('/getformations',dashController.getFormations);
router.delete('/deleteformations/:id',dashController.deleteFormations);
router.put('/putformations/:id',dashController.putFormations);

// Pour les enseignants
router.post('/enseignants',dashController.postens); 
router.get('/enseignants',dashController.getens); 
router.delete('/enseignants/:id',dashController.deleteens);  

// Pour les etudiants
router.get('/etudiants',dashController.getetudiant);
router.delete('/etudiants/:id',dashController.deletetudiant);

// Pour les supports
// router.post('',)
router.get('/supports',suppController.getsupp);
// router.delete('',)

module.exports = router;