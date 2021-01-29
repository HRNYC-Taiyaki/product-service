const fs = require('fs');
const csv = require('fast-csv');
const ws = fs.createWriteStream('/Users/co-star/Documents/clean-product.csv');

csv.parseStream(fs.createReadStream('/Users/co-star/Downloads/product.csv'), {headers:true})
.on('error', error => console.log(error))
.on('data', (row => {
    console.log(row);
}))
.on('end', () => {console.log('complete')});

// csv.write([

//     ['a1', 'b1'],
//     ['b1', 'c1'],
//     ['c1', 'd1']
// ], {headers:true})
// .pipe(ws);