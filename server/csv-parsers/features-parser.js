const csv = require('csv-parser');
const fs = require('fs');
const _ = require('underscore')


fs.createReadStream('/Users/co-star/Downloads/features.csv')
  .pipe(csv())
  .on('data', (row) => {
  row.id.trim();
  row.productId.trim();
  row.feature.trim();
  row.value.trim();
  let id = parseInt(row.id);
  let product_id = parseInt(row.productId);
  let feature = _.escape(row.feature);
  let value= _.escape(row.value);
  let insertRow = `${id},${product_id},"${feature}",${value}\n`;
  if (fs.existsSync('/Users/co-star/Documents/clean-features.csv')) {
    fs.appendFileSync('/Users/co-star/Documents/clean-features.csv', insertRow, (err) => {
      if (err) {
        throw err;
      }
    });
    console.log(id);
} else {
    fs.writeFileSync('/Users/co-star/Documents/clean-features.csv', insertRow, (err) => {
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
