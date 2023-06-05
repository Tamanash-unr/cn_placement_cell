const express = require('express');
const router = express.Router();
const passport = require('passport');
const utilsController = require('../controllers/utils_controller');

// Handle Routes for Batches
router.get('/batches', passport.checkAuthentication, utilsController.batches);
router.post('/create-batch', passport.checkAuthentication, utilsController.createBatch);
router.get('/delete-batch/:id', passport.checkAuthentication,utilsController.deleteBatch);

// Handle Routes for Students
router.get('/students', passport.checkAuthentication, utilsController.students);
router.post('/create-student', passport.checkAuthentication, utilsController.createStudent);
router.get('/delete-student/:score_id/:student_id', passport.checkAuthentication, utilsController.deleteStudent);

// Handle Routes for Interviews
router.get('/interviews', passport.checkAuthentication, utilsController.interviews);
router.post('/create-interview', passport.checkAuthentication, utilsController.createInterview);
router.get('/delete-interview/:id', passport.checkAuthentication, utilsController.deleteInterview); 

// Handle Routes for Interview Details and Result Updates
router.get('/interview-detail/:id', passport.checkAuthentication, utilsController.interviewDetail);
router.post('/interview/allot-student', passport.checkAuthentication, utilsController.allotStudent);
router.get('/delete-result/:id', passport.checkAuthentication, utilsController.deleteResult);
router.post('/interview/update-student-result', passport.checkAuthentication, utilsController.updateResult);

module.exports = router;