const jwt = require('jsonwebtoken');
const User = require('../models/user')
const secret = 'jwt_secret';

// Check user Authentication. (Middleware)
const authMiddleware = async (req, res, next) => {

    const token = req.headers.token;
    try {
        jwt.verify(token, secret, async (err, decoded) => {
            if(err) {
                return res.status(401).json({
                    code: 401,
                    message: "unauthorized user"
                })
            }
            req.user = { id: decoded.data._id };
            
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(401).json({
                    code: 401,
                    message: 'User not found, authorization denied'
                });
            }
            next();
        });
         
        
    } catch (err) {
        
        return res.status(500).json({
            code: 500,
            message: 'something went wrong'
        });
    }
};

module.exports = authMiddleware;