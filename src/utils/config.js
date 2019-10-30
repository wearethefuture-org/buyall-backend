const dotenv = require("dotenv");
const path = require("path");

const root = path.join.bind(this, __dirname, "../../");
dotenv.config({ path: root(".env") });

// Port and URL
exports.url = process.env.URL;
exports.port = process.env.PORT;

// PostgreSQL
exports.postgreURL = process.env.POSTGRE_URL;
