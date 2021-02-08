const csv = require('csv-parser');
const fs = require('fs');
const _ = require('underscore');

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
    let insertRow = `${id},"${name}","${slogan}","${description}","${category}",${defaultPrice} \n`;

      if (fs.existsSync('/Users/co-star/Documents/clean-product.csv')) {
          fs.appendFileSync('/Users/co-star/Documents/clean-product.csv', insertRow, (err) => {
            if (err) {
              throw err;
            }
          });
      } else {
          fs.writeFileSync('/Users/co-star/Documents/clean-product.csv', insertRow, (err) => {
            if (err) {
              throw err;
            }
          });
      }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });



