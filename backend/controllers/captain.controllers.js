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
        
        const isEmailExist = await captainModel.findOne({ email });
        if (isEmailExist) {
            return res.status(400).json({ message: 'Captain already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const captain = await captainService.createCaptain({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password: hashedPassword,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        });
       
        const token = captain.generateAuthToken();
        res.cookie('token', token, { httpOnly: true });
        res.status(201).json(captain);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports.loginCaptain = async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }   
    try{
        const {email,password}=req.body;
        const captain=await captainModel.findOne({email}).select('+password');
        if(!captain){
            return res.status(404).json({message:'Captain not found'});
        }
        const isMatch=await captain.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const token=captain.generateAuthToken();
        res.cookie('token',token,{httpOnly:true});
        res.status(200).json(captain);
    }catch(error){
        res.status(500).json({message:'Server error'});
    }
}

module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res) => {
    const token =req.cookies.token||req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successfully' });
}