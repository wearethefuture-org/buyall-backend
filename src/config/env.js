const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname, '../../');
dotenv.config({ path: root('.env') });

// Port and URL
exports.URL = process.env.URL;
exports.PORT = process.env.PORT;

// Environment
exports.NODE_ENV = process.env.NODE_ENV;
