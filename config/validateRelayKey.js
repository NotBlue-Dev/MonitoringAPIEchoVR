const Server = require("../models/Server");

function validateRelayKey(req, res, next) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ error: 'X-Api-Key header is missing' });
    }

    Server.find({key: apiKey}).then(result => {
        if (result.length === 0) {
            return res.status(403).json({ message: "The key provided is not the right one" });
        }
        next();
    }).catch(error => {
        return res.status(500).json({error: error});
    });
}

module.exports = validateRelayKey;