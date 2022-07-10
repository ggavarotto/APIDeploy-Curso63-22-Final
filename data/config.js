const mysql = require("mysql");
const util = require("util");

//Windows
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
})

pool.getConnection((err) => {
  err
    ? console.warn("No conectado", { error: err.message })
    : console.log("Conexión con B.D. establecida...");
});

pool.query = util.promisify(pool.query);
module.exports = pool;