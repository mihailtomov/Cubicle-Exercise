const { SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies['AUTH'];

    if (token) {
        jwt.verify(token, SECRET, (err, decodedToken) => {
            if (err) {
                res.clearCookie('AUTH');
            } else {
                req.user = decodedToken;
                res.locals.isAuthenticated = true;
            }
        });
    }

    next();
}