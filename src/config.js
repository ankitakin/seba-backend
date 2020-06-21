"use strict";
require("dotenv/config");
//Configuration variables

const port      = process.env.PORT        || '3000';
const mongoURI  = process.env.MONGODB_URI 
const JwtSecret = process.env.JWT_SECRET  ||'very secret secret';

module.exports = {
    port,
    mongoURI,
    JwtSecret,
};