const rideModel = require('../models/ride.model');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const mapService = require('./maps.service');
const crypto = require('crypto');
const { sendMessageToSocket } = require('../socket');



async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const origin = pickup;
    let distanceTime;
    
    try {
        distanceTime = await mapService.getDistanceTime(origin, destination);
        console.log('DistanceTime:', distanceTime); // Debugging log
    } catch (error) {
        console.error('Error getting distance and time:', error);
        throw new Error('Unable to calculate distance and time');
    }

    if (!distanceTime || !distanceTime.distance || !distanceTime.time) {
        throw new Error('Distance or time not received properly');
    }
    
    // Convert string values to numbers
    const distance = parseFloat(distanceTime.distance.replace(/[^0-9.]/g, ''));  // Removes non-numeric characters
    const time = parseFloat(distanceTime.time.replace(/[^0-9.]/g, ''));
    
    console.log(`Parsed Distance: ${distance}, Parsed Time: ${time}`); // Debugging log
    
    if (isNaN(distance) || isNaN(time)) {
        throw new Error('Invalid distance or time values');
    }
    
    const baseFares = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRates = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRates = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };

    const fareDetails = {};

    for (const vehicleType in baseFares) {
        const distanceFare = distance * perKmRates[vehicleType];
        const timeFare = time * perMinuteRates[vehicleType];
        fareDetails[vehicleType] = baseFares[vehicleType] + distanceFare + timeFare;

        if (isNaN(fareDetails[vehicleType])) {
            throw new Error(`Calculated fare for ${vehicleType} is invalid`);
        }
    }

    // Return fare details along with distance and time
    const duration=time;
    return { fareDetails, distance, duration };
}

module.exports.getFare = getFare;

async function getOtp(num) {
    if (!num || isNaN(num) || num < 1) {
        throw new Error('Valid OTP length is required');
    }

    const min = Math.pow(10, num - 1);  // Lower bound (e.g., 1000 for a 4-digit OTP)
    const max = Math.pow(10, num) - 1;  // Upper bound (e.g., 9999 for a 4-digit OTP)

    const otp = crypto.randomInt(min, max + 1).toString();  // Ensure `max` is included

    console.log(`Sending OTP ${otp} to user`);
    return otp;
}


module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination, and vehicleType are required');
    }

    const { fareDetails, distance, duration } = await getFare(pickup, destination);
    
    // Validate vehicleType 
    if (!fareDetails.hasOwnProperty(vehicleType)) {
        throw new Error('Invalid vehicle type');
    }

    const fare = fareDetails[vehicleType];

    // Create ride and ensure it's awaited
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        fare,
        vehicleType,
        distance,  // Add distance to schema
        duration,       // Add time to schema
        otp: await getOtp(6), // Generate OTP
    });

    return ride;
};




module.exports.confirmRide = async ({ rideId, captainId }) => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    if (!captainId) {
        throw new Error('Captain ID is required');
    }

    await rideModel.updateMany({ _id: rideId }, {
        captain: captainId,
        status: 'accepted'
    });

    const ride = await rideModel.findById(rideId).populate('user');
    if (!ride) {
        throw new Error('Ride not found');
    }
    await ride.save();

    return ride;
};

module.exports.startRide = async ({ rideId, otp ,captain}) => {
    if (!rideId || !otp) {
        throw new Error('Ride ID and OTP are required');
    }

    const ride = await rideModel.findById(rideId).populate('user').populate('captain').select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

   await rideModel.updateMany({ _id: rideId }, {
        status: 'ongoing',
        
    });
   sendMessageToSocket(ride.user.socketId, {
        event: "ride-started",
        data: ride,
    });
    return ride;
}


module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    const ride = await rideModel.findById(rideId).populate('user').populate('captain');
    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride is not ongoing');
    }

    await rideModel.updateMany({ _id: rideId }, {
        status: 'completed',
        
    });
    sendMessageToSocket(ride.user.socketId, {
        event: "ride-completed",
        data: ride,
    });
    return ride;
}