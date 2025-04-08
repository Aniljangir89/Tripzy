const express=require('express');
const router=express.Router();
const {body,query}=require('express-validator');
const authMiddleware=require('../middleware/auth.middleware');
const rideController=require('../controllers/ride.controllers');


router.post('/create',
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid drop address'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('Invalid vehicle type'),
    authMiddleware.authUser,
    rideController.createRide
);
router.get('/get-fare',
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid drop address'),
    rideController.getFare

)
router.post('/confirm',
    body('rideId').isString().withMessage('Invalid ride ID'),
    
    authMiddleware.authCaptain,
    rideController.confirmRide
);

router.get('/start-ride',
    authMiddleware.authCaptain,
    rideController.startRide,
    query('rideId').isString().withMessage('Invalid ride ID'),
    query('otp').isString().withMessage('Invalid OTP'),
)
router.post('/end-ride',
    authMiddleware.authCaptain,
    rideController.endRide,
    body('rideId').isString().withMessage('Invalid ride ID'),
)

module.exports = router;