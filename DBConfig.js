require("dotenv").config();
const parseDbUrl = require("parse-database-url");
const dbConfig = parseDbUrl(process.env.DATABASE_URL);
const Pool = require("pg").Pool;
const date = new Date().toLocaleDateString("en-IN");
var pg = require("pg");
// const itemsPool = new Pool({
//   connectionString: process.env.DB_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// module.exports = itemsPool;
const itemsPool = new Pool({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  ssl: true,
  // port: dbConfig.SAMPLE_DB_PORT,
});
module.exports = itemsPool;
