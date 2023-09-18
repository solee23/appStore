const jwt = require('jsonwebtoken');

const createToken = (id, role) => {
    return jwt.sign({_id: id, role},process.env.JWT_SECRET, { expiresIn: '5m' } )
};

const createRefreshToken = (id, role) => {
    return jwt.sign({_id: id, role},process.env.JWT_SECRET, { expiresIn: '1h' } )
};

module.exports = {
    createToken,
    createRefreshToken
}