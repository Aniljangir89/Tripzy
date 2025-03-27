const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controllers');
const authController=require('../controllers/user.controllers');
const authmiddleware=require('../middleware/auth.middleware');


router.post('/register', [
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('first name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long')
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long')
], userController.loginUser);

router.get('/logout',authmiddleware.authUser,authController.logoutUser);
router.get('/profile',authmiddleware.authUser,userController.getUserProfile);
module.exports = router;