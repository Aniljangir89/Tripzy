const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const mapController = require('../controllers/maps.controller'); // FIXED Import
const { query } = require('express-validator');

router.get('/getCoordinates', 
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getCoordinates // Now using `mapController.getCoordinates`
);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistanceTime 
);  

router.get('/get-suggestions',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getSuggestions 
);
module.exports = router;
