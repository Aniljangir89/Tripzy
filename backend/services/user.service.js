const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !password || !email) throw new Error('All fields are required');
    
    const user = await userModel.create({  // ✅ Added "await"
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
    });

    return user;
};
