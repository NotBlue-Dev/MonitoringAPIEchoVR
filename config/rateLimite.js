const dotenv = require('dotenv');
dotenv.config();

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: process.env.ENVIRONEMENT === "development" ? 1000 : 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

module.exports = limiter;