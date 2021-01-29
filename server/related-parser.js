const csv = require('csv-parser');
const fs = require('fs');
const mysql = require('mysql');
const {config} = require('../config.js');

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

let rejects = [];

fs.createReadStream('related.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row.id) {
      row.id.trim()
      row.current_product_id.trim()
      row.related_product_id.trim()
      let idLength = row.id.length;
      let idParsed = parseInt(row.id);
      let prodIdLength = row.current_product_id.length;
      let prodIdParsed = parseInt(row.current_product_id);
      let relIdLength = row.related_product_id.length;
      let relIdParsed = parseInt(row.related_product_id);
      if (idParsed === NaN || prodIdParsed === NaN || relIdParsed === NaN || idLength !== idParsed.toString.length || prodIdLength !== idParsed.toString.length || relIdLength !== idParsed.toString.length) {
        rejects.push(row);
      } else {
        connection.query(`INSERT INTO RelatedProducts(id,product_id,related_id)
        VALUES(${idParsed},${prodIdParsed},${relIdParsed})`);
      }
    } else {
      rejects.push(row)
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

  console.log('rejects :', rejects);