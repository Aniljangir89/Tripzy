const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const userServices = require('../services/user.service');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerUser = async (req, res, next) => {
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract data safely
        const { fullname, email, password } = req.body;
        const { firstname, lastname } = fullname || {}; // Ensure username is not undefined
         const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Hash password

        const hashPassword = await userModel.hashPassword(password);

        // Create user
        const user = await userServices.createUser({
             firstname,
             lastname, // Store correctly as an object
            email,
            password: hashPassword
        });

        // Generate token
        const token = user.generateAuthToken();

        return res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports.loginUser=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email ,password}=req.body;
    try{
        const user=await userModel.findOne({email}).select('+password');
        if(!user) return res.status(401).json({message:'invalid credentials'});
        const isMatch=await user.comparePassword(password);
        if(!isMatch)return res.status(401).json({message:'invalidcredentials'});
        const token=user.generateAuthToken();
        res.cookie('token',token,{httpOnly:true});
        return res.status(200).json({token,user});
    }catch(error){
        console.error(error);
        return res.status(500).json({message:'Server error'});
    }
}

module.exports.getUserProfile=async(req,res,next)=>{
    try{
        const user=await userModel.findById(req.user._id);
        if(!user)return res.status(404).json({message:'User not found'});
        return res.status(200).json(user);
    }catch(error){
        console.error(error);
        return res.status(500).json({message:'Server error'});
    }
}
module.exports.logoutUser=async(req,res,next)=>{
    res.clearCookie('token');
    const token=req.cookies.token||req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({token});
    return res.status(200).json({message:'User logged out'});
}