const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/authentication');
const TourController = require('../controllers/toursController');
const UploadController = require('../controllers/uploadController');
//router.post('/upload', busboy(),TourController.upload);
router.post('/upload', UploadController.uploadFile);
router.post('/search', TourController.search);
router.get('/', TourController.list); // List all tours
router.post('/:username/create',  middlewares.checkGuideAuthentication,TourController.create); // Create a new tours   middlewares.checkAuthentication, 
router.put('/:username/:tour_id',   middlewares.checkGuideAuthentication,TourController.update); // Update a tours by Id   middlewares.checkAuthentication,
router.delete('/:username/:tour_id',  middlewares.checkGuideAuthentication, TourController.remove); // Delete a tours by Id    middlewares.checkAuthentication,


module.exports = router;