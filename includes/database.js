const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'saboroso',
  password: 'QXV9UG7L',
});

module.exports = connection;
