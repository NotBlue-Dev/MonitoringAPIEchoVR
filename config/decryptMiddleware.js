const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.PRIVATE_KEY;
function decryptMiddleware(req, res, next) {
    const encryptedData = req.body.data; // Assuming data is sent in the request body
    console.log(encryptedData);
    if (!encryptedData) {
        return res.status(400).json({ error: 'No encrypted data provided' });
    }

    const decryptedData = crypto.privateDecrypt(
        {
            key: secretKey,
            padding: crypto.constants.RSA_PKCS1_PADDING
        },
        Buffer.from(encryptedData, 'base64')
    );

    const decryptedText = decryptedData.toString('utf8');
    req.body = JSON.parse(decryptedText);
    console.log(req.body);
    next();
}

module.exports = decryptMiddleware;