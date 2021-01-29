const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fastcsv = require('fast-csv');
const fs = require('fs');
const mysql = require('mysql');
const {config} = require('../config.js');
const _ = require('underscore');
const converter = require('json-2-csv');

const csvWriter = createCsvWriter({
  path: '/Users/co-star/Documents/clean-product.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'name', title: 'name'},
    {id: 'slogan', title: 'slogan'},
    {id: 'description', title: 'description'},
    {id: 'category', title: 'category'},
    {id: 'default_price', title: 'default_price'},
  ]
});


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

const ws = fs.createWriteStream('/Users/co-star/Documents/clean-product.csv');

let storage = [];


fs.createReadStream('/Users/co-star/Downloads/product.csv')
  .pipe(csv())
  .on('data', (row) => {
    row.id.trim();
    row.name.trim();
    row.slogan.trim();
    row.description.trim();
    row.category.trim();
    row.default_price.trim();
    let id = parseInt(row.id);
    let defaultPrice;
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
    let insertRow = `${id},${name}',${slogan}',${description}',${category}', ${defaultPrice} \n`;
    if (storage.length > 200) {
      storage.push(insertRow);
      if (fs.existsSync('/Users/co-star/Documents/clean-product.csv')) {
        storage.forEach(item => {
          fs.appendFile('/Users/co-star/Documents/clean-product.csv', item, (err) => {
            if (err) {
              throw err;
            }
          })
        });
      } else {
        storage.forEach(item => {
          fs.writeFileSync('/Users/co-star/Documents/clean-product.csv', item, (err) => {
            if (err) {
              throw err;
            }
          })
        });
      }
      storage = [];
    }
      
      //id,name,slogan,description,category,default_price
      // .pipe(ws)
    // connection.query(`INSERT INTO Products(id,name,slogan,description,category,default_price)
    //     VALUES(${id},'${name}','${slogan}','${description}','${category}',${defaultPrice})`, (err, result) => {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         console.log(result);
    //       }
    //     });

  })
  // .pipe(csvWriter.writeRecords({
  //   'id':id, 'name':`'${name}'`, 'slogan':`'${slogan}'`, 'description':`'${description}'`, 'category':`'${category}'`, 'default_price':default_price
  // }, {headers:true}).then((res) => {console.log(res, 'hi')}))
  .on('end', () => {
    console.log('CSV file successfully processed');
  });



