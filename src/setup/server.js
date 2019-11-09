const { NODE_ENV, PORT } = require('../config/env');

// Starting server
module.exports = app => {
  console.info('SETUP - Starting server..');

  app.listen(PORT, () =>
    console.log(`Server started on port ${PORT} | ${NODE_ENV}`)
  );
};
