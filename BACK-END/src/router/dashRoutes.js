const express = require('express');
const router = express.Router();

const dashController = require('./../controller/dashController');

// Pour les formations
router.post('/formations',dashController.postFormations);
router.get('/getformations',dashController.getFormations);
router.delete('/deleteformations/:id',dashController.deleteFormations);
router.put('/putformations/:id',dashController.putFormations);

// Pour les enseignants
router.post('/enseignants',dashController.postens); 
router.get('/enseignants',dashController.getens); 
router.delete('/enseignants/:id',dashController.deleteens);  
module.exports = router;