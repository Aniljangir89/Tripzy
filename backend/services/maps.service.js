const axios = require('axios');
const captainModel = require('../models/captain.model'); // Import the captain model
// Function to get coordinates from an address
module.exports.getAddressCoordinates = async (address) => {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: address,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': 'MyUberCloneApp/1.0 (aniljangid8991@gmail.com)'
            }
        });

        if (!response.data || response.data.length === 0) {
            throw new Error(`No results found for: "${address}"`);
        }

        return {
            lat: parseFloat(response.data[0].lat),
            lng: parseFloat(response.data[0].lon)
        };
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        return null; // Return null instead of throwing an error
    }
};

// Haversine formula to calculate direct distance (fallback)
// Haversine formula to calculate direct distance and estimated travel time
function getHaversineDistance(coord1, coord2) { // Average speed in km/h
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Earth's radius in km

    const dLat = toRad(coord2.lat - coord1.lat);
    const dLng = toRad(coord2.lng - coord1.lng);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = (R * c).toFixed(2); // Distance in km
    const averageSpeed=60;
    const time = (distance / averageSpeed).toFixed(2); // Time in hours

    return { distance: `${distance} km`, time: `${(time * 45).toFixed(2)} min` }; // Convert hours to minutes
}

// Function to get address suggestions based on user input
module.exports.getSuggestions = async (query) => {
    try {
        if (!query || query.trim().length === 0) {
            throw new Error('Invalid query provided.');
        }

        const response = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
            params: {
                key: process.env.GOOGLE_MAPS_API,
                q: query,
                format: 'json',
                limit: 5
            }
        });

        if (!response.data || response.data.length === 0) {
            return []; // No suggestions found
        }

        // Extract and return formatted address suggestions
        return response.data.map(place => ({
            label: place.display_name, // Full address
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon)
        }));
    } catch (error) {
        console.error('Error fetching address suggestions:', error.message);
        return []; // Return empty list if API fails
    }
};

// Function to get distance and time between two coordinates using Haversine formula
// Function to get distance and estimated travel time using Haversine formula
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    let originCoordinates = origin;
    let destinationCoordinates = destination;

    // If origin or destination is a string (address), fetch coordinates
    if (typeof origin === 'string') {
        originCoordinates = await module.exports.getAddressCoordinates(origin);
    }
    if (typeof destination === 'string') {
        destinationCoordinates = await module.exports.getAddressCoordinates(destination);
    }

    // Validate fetched coordinates
    if (!originCoordinates || !destinationCoordinates) {
        throw new Error('Invalid origin or destination');
    }

    return getHaversineDistance(originCoordinates, destinationCoordinates);
};

module.exports.getCaptainsInRadius = async (ltd, lng, radius) => {
    try {
        const captains = await captainModel.find({
            "location.ltd": { $gte: ltd - (radius / 111.32), $lte: ltd + (radius / 111.32) },
            "location.lng": { $gte: lng - (radius / 111.32), $lte: lng + (radius / 111.32) }
        });
        

        return captains;
    } catch (error) {
        console.error('Error fetching captains in radius:', error.message);
        return [];
    }
};

