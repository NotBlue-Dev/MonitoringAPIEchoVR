function validateProviderMiddleware(req, res, next) {
    let clientIP = req.ip || req.connection.remoteAddress;
    if (clientIP.startsWith("::ffff:")) {
        clientIP = clientIP.slice(7);
    }
    if (clientIP !== req.body.serverAddress && clientIP !== req.body.serverAddress && clientIP !== req.params.server) {
        // If IP does not match serverIP or ip from the request body, send a forbidden response
        return res.status(403).json({ message: "The IP posting on the API must match the provided server IP" });
    }

    // If the IP matches serverIP or ip, proceed with the middleware chain
    next();
}

module.exports = validateProviderMiddleware;