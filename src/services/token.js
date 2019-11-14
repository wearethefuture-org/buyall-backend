const jwt = require('jsonwebtoken');


class TokenService {
    async generateToken(payload, expiresIn) {
        const secretKey = process.env.SECRET_KEY;
        return jwt.sign(payload, secretKey, {expiresIn});
    }
}

module.exports = TokenService;
