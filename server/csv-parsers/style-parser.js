const csv = require('csv-parser');
const fs = require('fs');
const _ = require('underscore')


fs.createReadStream('/Users/co-star/Downloads/styles.csv')
  .pipe(csv())
  .on('data', (row) => {
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
  let insertRow = `${id},${product_id},"${name}",${sale_price},${original_price},${default_style}\n`;
  if (fs.existsSync('/Users/co-star/Documents/clean-styles.csv')) {
    fs.appendFileSync('/Users/co-star/Documents/clean-styles.csv', insertRow, (err) => {
      if (err) {
        throw err;
      }
    });
    console.log(id);
} else {
    fs.writeFileSync('/Users/co-star/Documents/clean-styles.csv', insertRow, (err) => {
      if (err) {
        throw err;
      }
    });
    console.log(id);
}
})
.on('end', () => {
console.log('CSV file successfully processed');
});


//id,productId,name,sale_price,original_price,default_style



 /*
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
          console.log(id);
      } else {
          fs.writeFileSync('/Users/co-star/Documents/clean-product.csv', insertRow, (err) => {
            if (err) {
              throw err;
            }
          });
          console.log(id);
      }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
  */



