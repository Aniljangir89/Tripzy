const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklistToken.model'); // Import the BlacklistToken model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'unauthorized' });

    // Check if the token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) return res.status(401).json({ message: 'unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) return res.status(401).json({ message: 'unauthorized' });
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Server error' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'unauthorized' });

    // Check if the token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) return res.status(401).json({ message: 'unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if (!captain) return res.status(401).json({ message: 'unauthorized' });
        req.captain = captain;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Server error' });
    }
}