const database = require('../services/database');

// Connecting to database
module.exports = async () => {
  console.info('SETUP - Connecting database...');

  return await database
    .authenticate()
    .then(() => {
      console.log('Connected to database');
    })
    .catch(() => {
      console.error('Unable to connect to database');
      process.exit(1);
    });
};
