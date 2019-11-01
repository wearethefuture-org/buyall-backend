const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');

const database = require('./services/database');
const errorHandler = require('./middleware/errorHandler');
const router = require('./routes');
const { port } = require('./utils/config');

const app = new Koa();

app.use(helmet());
app.use(bodyParser());
app.use(cors());

app.use(errorHandler);

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
