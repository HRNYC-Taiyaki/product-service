const csv = require('csv-parser');
const fs = require('fs');
const _ = require('underscore')


fs.createReadStream('/Users/co-star/Downloads/skus.csv')
  .pipe(csv())
  .on('data', (row) => {
  row.id.trim();
  row.styleId.trim();
  row.size.trim();
  row.quantity.trim();
  let id = parseInt(row.id);
  let styleId = parseInt(row.styleId);
  let size = _.escape(row.size);
  let quantity= parseInt(row.quantity);
  let insertRow = `${id},${styleId},"${size}",${quantity}\n`;
  if (fs.existsSync('/Users/co-star/Documents/clean-skus.csv')) {
    fs.appendFileSync('/Users/co-star/Documents/clean-skus.csv', insertRow, (err) => {
      if (err) {
        throw err;
      }
    });
} else {
    fs.writeFileSync('/Users/co-star/Documents/clean-skus.csv', insertRow, (err) => {
      if (err) {
        throw err;
      }
    });
}
})
.on('end', () => {
console.log('CSV file successfully processed');
});
