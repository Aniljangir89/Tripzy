const { selectFields } = require('express-validator/lib/field-selection');
const moongoose = require('mongoose');


const rideSchema = new moongoose.Schema({
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'captain',
    
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        enum: ['auto', 'car', 'motorcycle'],
        required: true
    },
    distance: {
        type: Number,
      
    },
    duration: {
        type: Number,
    
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed','ongoing', 'cancelled','accepted'],
        default: 'pending'
    },
    paymentId: {
        type: String,
      
    },
    orderId: {
        type: String,
       
    },

    signature: {
        type: String,
       
    },
    otp: {
        type: String,
        select: false,
        required: true
    },
}, { timestamps: true });

module.exports = moongoose.model('ride', rideSchema);