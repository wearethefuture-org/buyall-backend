const jwt = require('jsonwebtoken');
const config = require('./config');

const generateToken = async (payload) => { 
    return jwt.sign(
        payload,
        config.secretKey, 
        {expiresIn: config.tokenTime}
    );
}

const generateRandomString = () => { 
    return Math.random().toString(36).substring(2, 15) + 
        Math.random().toString(36).substring(2, 15);
};

module.exports = {
    generateToken,
    generateRandomString
};
