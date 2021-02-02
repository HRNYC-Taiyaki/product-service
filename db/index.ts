const mysql = require('mysql');
const {mysqlConfig} = require('../config');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err: any) => {
    if (err) {
      return console.log('error: ', err);
    } else {
      console.log('Connected to MySQL!');
    }
  });

module.exports = connection;