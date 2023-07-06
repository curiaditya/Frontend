const jwt = require('jsonwebtoken');

// generateToken will generate a token with user id, that expires in 30days
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

module.exports = generateToken;