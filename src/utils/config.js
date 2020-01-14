const dotenv = require('dotenv');
const path = require('path');

const root = path.join.bind(this, __dirname, '../../');

let env = '';
  switch (process.env.NODE_ENV) {
    case 'dev':
      env = 'dev';
      break;
    case 'production':
      env = 'prod';
      break;
    case 'e2e': 
      env = 'e2e';
      break;
    default:
      break;
  }

dotenv.config({ path: root(`${env}.env`) });

// Port and URL
exports.url = process.env.URL;
exports.port = process.env.PORT;

// PostgreSQL
exports.databaseName = process.env.DATABASE_NAME;
exports.username = process.env.POSTGRES_USERNAME;
exports.password = process.env.POSTGRES_PASSWORD;
exports.host = process.env.POSTGRES_HOST;

// Security
exports.tokenTime = +process.env.TOKEN_TIME;
exports.secretKey = process.env.SECRET_KEY;
exports.saltRounds = +process.env.SALT_ROUNDS;

// Front
exports.frontUrl = process.env.FRONT_URL;
exports.frontPort = process.env.FRONT_PORT;