const jwt = require('jsonwebtoken');
const BaseModel = require('./baseModel');


class TokenService extends BaseModel {
    async generateToken(payload, expiresIn) {
        // replace it to base service
        const secretKey = process.env.SECRET_KEY;
        return jwt.sign(payload, secretKey, {expiresIn});
    }
}

module.exports = TokenService;
