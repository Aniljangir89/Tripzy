const mapsService = require('../services/maps.service');
const { getAddressCoordinates, getDistanceTime, getSuggestions } = mapsService;
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const { address } = req.query;
        if (!address) {
            console.log('Address parameter is missing');
            return res.status(400).json({ error: 'Address parameter is required' });
        }
        const coordinates = await getAddressCoordinates(address);
        res.json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const { origin, destination } = req.query; // Directly access JSON data

        if (!origin || !destination) {
            return res.status(400).json({ error: 'Origin and destination are required' });
        }

       

        const distanceTime = await getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        console.error('Error fetching distance and time:', error.message);
        next(error);
    }
};


module.exports.getSuggestions = async (req, res, next) => {
    try {
        const { address } = req.query;
        if (!address) {
            return res.status(400).json({ error: 'Address parameter is required' });
        }
        const suggestions = await getSuggestions(address);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error.message);
        next(error);
    }
};