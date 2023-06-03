const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');

// Handle Routes for Sign In and Sign Up
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);

// Handle Route for Create User
router.post('/create-user', userController.createUser);

// Use Passport as a middleware to authenticate and create a user Session
router.post('/create-user-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) ,userController.createUserSession);

// Handle the Sign Out Route
router.get('/sign-out', userController.destroySession);

module.exports = router;