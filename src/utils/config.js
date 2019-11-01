const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname, '../../');
dotenv.config({ path: root('.env') });

// Port and URL
exports.url = process.env.URL;
exports.port = process.env.PORT;

// PostgreSQL
exports.databaseName = process.env.DATABASE_NAME;
exports.username = process.env.POSTGRES_USERNAME;
exports.password = process.env.POSTGRES_PASSWORD;
exports.host = process.env.POSTGRES_HOST;
