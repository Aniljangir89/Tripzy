const express = require('express');
const router = express.Router();
const {body}=require('express-validator');
const captainController=require('../controllers/captain.controllers');
const authMiddleware=require('../middleware/auth.middleware');  
router.post('/register',[
    body('fullname').isLength({min:3}).withMessage('name must be at least 3 characters'),
    body('email').isEmail().withMessage('email is not valid'),
    body('password').isLength({min:5}).withMessage('password must be at least 5 characters'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 characters'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be at least 3 characters'),
    body('vehicle.capacity').isNumeric().withMessage('capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('vehicle type must be car, motorcycle or auto')
],captainController.registerCaptain); 

router.post('/login',[
    body('email').isEmail().withMessage('email is not valid'),
    body('password').isLength({min:5}).withMessage('password must be at least 5 characters')
],captainController.loginCaptain);


router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);

router.post('/logout',authMiddleware.authCaptain,captainController.logoutCaptain);
module.exports = router;