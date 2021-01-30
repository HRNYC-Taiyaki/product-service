const mysql = require('mysql');
const {mysqlConfig} = require('../config');

console.log('mysqlL ', mysqlConfig);

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
    if (err) {
      return console.log('error: ', err);
    } else {
      console.log('Connected to MySQL!');
    }
  });

module.exports = connection;