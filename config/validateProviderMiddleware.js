const dotenv = require('dotenv');
dotenv.config();

function validateProviderMiddleware(req, res, next) {
    const clientIP = req.ip || req.connection.remoteAddress;

    if (clientIP === "::1" && process.env.ENVIRONEMENT === "development") {
        // If in development mode and IP is localhost, proceed with the middleware chain
        return next();
    }

    if (clientIP !== req.body.serverIP && clientIP !== req.body.ip) {
        // If IP does not match serverIP or ip from the request body, send a forbidden response
        return res.status(403).json({ message: "Forbidden" });
    }

    // If the IP matches serverIP or ip, proceed with the middleware chain
    next();
}

module.exports = validateProviderMiddleware;