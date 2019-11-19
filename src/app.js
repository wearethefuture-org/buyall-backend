const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');

const database = require('./services/database');
const passport = require('./services/passport');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/authHandler');
const userRoleMiddleware = require('./middleware/userHandler');
const router = require('./routes');
const { port } = require('./utils/config');

/**
 * Loading env variables
 */
require('./services/env')(`${__dirname}/../`);


const app = new Koa();

app.use(helmet());
app.use(bodyParser());
app.use(cors());

app.use(errorHandler);
app.use(authMiddleware);
app.use(userRoleMiddleware);

app.use(passport.initialize());
app.use(router);

database
  .authenticate()
  .then(() => {
    console.log('Connected to database');
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch(() => {
    console.error('Unable to connect to database');
    process.exit(1);
  });
