const csv = require('csv-parser');
const fs = require('fs');
const _ = require('underscore');



let rejects = [];

fs.createReadStream('/Users/co-star/Downloads/related.csv')
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
     
        let insertRow = `${idParsed},${prodIdParsed},${relIdParsed} \n`;
        if (fs.existsSync('/Users/co-star/Documents/clean-related.csv')) {
            fs.appendFileSync('/Users/co-star/Documents/clean-related.csv', insertRow, (err) => {
              if (err) {
                throw err;
              }
            });
            console.log(idParsed);
        } else {
            fs.writeFileSync('/Users/co-star/Documents/clean-related.csv', insertRow, (err) => {
              if (err) {
                throw err;
              }
            });
            console.log(idParsed);
        }
    }
  })
  .on('end', () => {
    console.log('rejects :', rejects);
    console.log('CSV file successfully processed');
  });