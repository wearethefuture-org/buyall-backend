const combineRouters = require('../utils/combineRouters');

const usersRouter = require('./users');

const router = combineRouters([usersRouter]);

module.exports = router;
