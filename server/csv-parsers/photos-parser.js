const csv = require('csv-parser');
const fs = require('fs');
const _ = require('underscore')


fs.createReadStream('/Users/co-star/Downloads/photos.csv')
  .pipe(csv())
  .on('data', (row) => {
  row.id.trim();
  row.styleId.trim();
  row.url.trim();
  row.thumbnail_url.trim();
  let id = parseInt(row.id);
  let styleId = parseInt(row.styleId);
  let url = _.escape(row.url);
  let thumbnail_url = _.escape(row.thumbnail_url);
  let insertRow = `${id},${styleId},"${url}",${thumbnail_url}\n`;
  if (fs.existsSync('/Users/co-star/Documents/clean-photos.csv')) {
    fs.appendFileSync('/Users/co-star/Documents/clean-photos.csv', insertRow, (err) => {
      if (err) {
        throw err;
      }
    });
} else {
    fs.writeFileSync('/Users/co-star/Documents/clean-photos.csv', insertRow, (err) => {
      if (err) {
        throw err;
      }
    });
}
})
.on('end', () => {
console.log('CSV file successfully processed');
});
