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

// Google Cloud
exports.cloudConfigPath = process.env.CLOUD_JSON_PATH;
exports.projectId = process.env.PROJECT_ID;
exports.bucketName = process.env.BUCKET_NAME;
