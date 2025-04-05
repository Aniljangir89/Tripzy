const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocket } = require('../socket')
const rideModel = require('../models/ride.model');
const captainModel = require('../models/captain.model');

module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    if (!pickup || !destination || !vehicleType) {
        return res.status(400).json({ error: 'Pickup, destination and vehicleType are required' });
    }
    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        if (!ride) {
            return res.status(500).json({ error: 'Failed to create ride' });

        }
        res.status(201).json(ride);
        const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
        const captainsInregion = await mapService.getCaptainsInRadius(pickupCoordinates.lat, pickupCoordinates.lng, 10);
       
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        captainsInregion.map((captain) => {
            if (!captain.socketId) {
                console.warn(`⚠️ Captain ${captain.fullname.firstname} has no socketId, skipping message.`);
                return;
            }
        
            const messageObject = {
                event: "new-ride",
                data: rideWithUser,
            };
        
            console.log(`📩 Sending ride request to ${captain.fullname.firstname} (Socket ID: ${captain.socketId})`);
            sendMessageToSocket(captain.socketId, messageObject);
        });
        

    } catch (error) {
        console.error('Error creating ride:', error.message);
        next(error);
    }
};

module.exports.getFare = async (req, res, next) => {
    const { pickup, destination } = req.query;
    if (!pickup || !destination) {
        return res.status(400).json({ error: 'Pickup and destination are required' });
    }
    try {
        const fareDetails = await rideService.getFare(pickup, destination);
        res.status(200).json(fareDetails);
    } catch (error) {
        console.error('Error fetching fare:', error.message);
        next(error);
    }
};



module.exports.confirmRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    if (!rideId) {
        return res.status(400).json({ error: 'Ride ID is required' });
    }

    try {
        // Pass an object with rideId and captainId to the service function
        const ride = await rideService.confirmRide({ rideId, captainId: req.captain._id });
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }
        res.status(200).json(ride);
        const captainData= await rideModel.findOne({ _id: rideId }).populate('captain');
        sendMessageToSocket(ride.user.socketId, {
            event: "ride-confirmed",
            data: captainData,
        });
    } catch (error) {
        console.error('Error confirming ride:', error.message);
        next(error);
    }
};


module.exports.startRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;
    if (!rideId || !otp) {
        return res.status(400).json({ error: 'Ride ID and OTP are required' });
    }

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain._id });
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found or invalid OTP' });
        }
        res.status(200).json(ride);
        sendMessageToSocket(ride.user.socketId, {
            event: "ride-started",
            data: ride,
        });
    } catch (error) {
        console.error('Error starting ride:', error.message);
        next(error);
    }
}


module.exports.endRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    if (!rideId) {
        return res.status(400).json({ error: 'Ride ID is required' });
    }

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain._id });
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }
        res.status(200).json(ride);
        sendMessageToSocket(ride.user.socketId, {
            event: "ride-completed",
            data: ride,
        });
    } catch (error) {
        console.error('Error ending ride:', error.message);
        next(error);
    }
}