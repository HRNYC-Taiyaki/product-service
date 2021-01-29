'use strict';

// const csv = require('csv-parser');
const fs = require('fs');
// const readline = require ('readline');
const papaParse = require('papaParse');
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

const scrubber = async (results, parser) => {
  let row = results.data;
  row.id.trim();
  row.productId.trim();
  row.name.trim();
  row.sale_price.trim();
  row.original_price.trim();
  row.default_style.trim();
  let id = parseInt(row.id);
  let product_id = parseInt(row.productId);
  let name = _.escape(row.name);
  let sale_price;
  let original_price;
  if (row.sale_price == 'null') {
    sale_price = null;
  } else if (!parseInt(row.sale_price)) {
    let matches = row.sale_price.match(/(\d+)/);
    sale_price = matches[0];
  } else {
    sale_price = parseInt(row.sale_price);
  }
  if (!parseInt(row.original_price)) {
    let matches = row.original_price.match(/(\d+)/);
    original_price = matches[0];
  } else {
    original_price = parseInt(row.original_price);
  }
  let default_style = parseInt(row.default_style);
  parser.pause();
    await connection.query(`INSERT INTO Styles(id,product_id,name,sale_price,original_price,default_style)
    VALUES(${id},${product_id},'${name}',${sale_price},${original_price},${default_style}) ON DUPLICATE KEY UPDATE id=${id};`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  parser.resume();
}

//id,productId,name,sale_price,original_price,default_style

let CsvParser = () => {
    papaParse.parse(fs.createReadStream('styles.csv');, {
      delimiter: "",	// auto-detect
	    newline: "",	// auto-detect
	    quoteChar: '"',
      escapeChar: '"',
      download: true,
	    header: true,
      worker: false, // Don't bog down the main thread if its a big file
      step: scrubber,
      complete: () => {
          console.log('parsing complete');
      }
    });
  }

CsvParser();



