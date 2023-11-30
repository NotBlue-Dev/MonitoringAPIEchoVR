const dotenv = require('dotenv');
dotenv.config();

function validateServerOwner(req, res, next) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ error: 'X-Api-Key header is missing' });
    }

    if (apiKey !== process.env.CENTRALKEY) {
        return res.status(403).json({ message: "The key provided is not the right one" });
    }

    next();
}

module.exports = validateServerOwner;