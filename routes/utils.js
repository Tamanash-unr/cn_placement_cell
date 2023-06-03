const express = require('express');
const router = express.Router();
const utilsController = require('../controllers/utils_controller');

router.get('/batches', utilsController.batches);
router.post('/create-batch', utilsController.createBatch);
router.get('/delete-batch/:id',utilsController.deleteBatch);

router.get('/students', utilsController.students);
router.post('/create-student', utilsController.createStudent);
router.get('/delete-student/:score_id/:student_id', utilsController.deleteStudent);

module.exports = router;