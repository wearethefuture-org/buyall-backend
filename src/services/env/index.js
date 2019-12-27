const path = require('path');
const dotenv = require('dotenv');

module.exports = dir => {
  let env = '';
  switch (process.env.NODE_ENV) {
    case 'local':
      env = '';
      break;
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

  dotenv.config({
    path: path.resolve(dir, `${env}.env`)
  });
};
