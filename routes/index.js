// Get Required Libraries
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Include required Controllers
const homeController = require('../controllers/home_controller');
const downloadsController = require('../controllers/downloads_controller');

// Setup Routes for Home and Download CSV
router.get('/', passport.checkAuthentication, homeController.home);
router.get('/download_all', passport.checkAuthentication, downloadsController.downloadCSV);

// Setup Routes for User Sign In/Sign Up and Utils
router.use('/users', require('./users'));
router.use('/utils', require('./utils'));

module.exports = router;