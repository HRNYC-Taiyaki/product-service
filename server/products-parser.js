const csv = require('csv-parser');
const fs = require('fs');
const mysql = require('mysql');
const {config} = require('../config.js');
const _ = require('underscore')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: config.password,
  database: 'products'
});

connection.connect((err) => {
  if (err) {
    return console.log('error: ', err);
  } else {
    console.log('Connected to MySQL!')
  }
});

fs.createReadStream('product2.csv')
  .pipe(csv())
  .on('data', (row) => {
    row.id.trim();
    row.name.trim();
    row.slogan.trim();
    row.description.trim();
    row.category.trim();
    row.default_price.trim();
    let id = parseInt(row.id);
    let default_price;
    if (!parseInt(row.default_price)) {
      let matches = row.default_price.match(/(\d+)/);
      defaultPrice = matches[0];
    } else {
      defaultPrice = parseInt(row.default_price);
    }
    let name = _.escape(row.name);
    let slogan = _.escape(row.slogan);
    let description = _.escape(row.description);
    let category = _.escape(row.category);
    connection.query(`INSERT INTO Products(id,name,slogan,description,category,default_price)
        VALUES(${id},'${name}','${slogan}','${description}','${category}',${defaultPrice})`, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        });

  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });



