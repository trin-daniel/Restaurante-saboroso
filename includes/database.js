const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'trindaniel',
  database: 'saboroso',
  password: 'QXV9UG7L',
});

module.exports = connection;