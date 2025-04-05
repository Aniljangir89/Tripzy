const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.services');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { fullname, email, password, vehicle } = req.body;
        const { color, plate, capacity, vehicleType } = vehicle;
        
        // ✅ Check if Captain already exists
        const isEmailExist = await captainModel.findOne({ email });
        if (isEmailExist) {
            return res.status(400).json({ message: 'Captain already exists' });
        }

        // ✅ Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create Captain in DB
        const captain = new captainModel({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password: hashedPassword,
            vehicle: { color, plate, capacity, vehicleType }
        });

        await captain.save(); // Save captain instance

        // ✅ Generate JWT Token
        const token = captain.generateAuthToken();

        // ✅ Set HTTP-only Cookie
        res.cookie('token', token, { httpOnly: true });

        // ✅ Send Response
        res.status(201).json({ captain, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   

    try {
        const { email, password } = req.body;

        // ✅ Find Captain by Email
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(404).json({ message: 'Captain not found' });
        }

        // ✅ Check Password Match
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // ✅ Generate Token
        const token = captain.generateAuthToken();
        res.cookie('token', token, { httpOnly: true });

        // ✅ Send Response
        res.status(200).json({ captain, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        // ✅ Blacklist Token
        await blacklistTokenModel.create({ token });

        // ✅ Clear Cookie
        res.clearCookie('token');

        res.status(200).json({ message: 'Logout successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
