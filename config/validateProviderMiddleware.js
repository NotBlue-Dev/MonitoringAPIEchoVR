const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.PRIVATE_KEY;
function validateProviderMiddleware(req, res, next) {
    if(req.ip !== req.body.serverIP || req.ip !== req.body.ip) {
        return res.status(403).json({message:"Forbidden"});
    }
    console.log(req.body.serverIP, req.body.ip, req.ip);
    next();
}

module.exports = validateProviderMiddleware;