require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    dbURL: process.env.MONGO_URI,
    jwtSecter: process.env.JWT_SECRET
};