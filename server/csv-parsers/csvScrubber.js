const csv = require('csv-parser');
const fs = require('fs');
const _ = require('underscore')

module.exports = csvScrubber = (csvPath, cleanCsvPath, headers, transformTo, escapeStrings, boolCB) => {

    fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => {
        let counter = 0;
        let insertRow = ``;
        headers.forEach((col) => {
            console.log(row);
            row[col].trim();
            row[col] = transformer(transformTo[counter][0], transformTo[counter][1], row[col], escapeStrings, boolCB);
            counter++;
            console.log(row);
            insertRow += `${row[col]},`
        });
        insertRow.slice(-1);
        insertRow += `\n`;
        if (fs.existsSync(cleanCsvPath)) {
            fs.appendFileSync(cleanCsvPath, insertRow, (err) => {
                if (err) {
                    throw err;
                }
            });
        } else {
            fs.writeFileSync(cleanCsvPath, insertRow, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });
    
}

let transformer = (typeBefore, typeAfter, value, escape, boolCb) => {
    if (typeBefore === 'string' && typeAfter === 'string' ) { return (escape ?  _.escape(value) : value) }
    else if (typeBefore === 'string' && typeAfter === 'number' ) { if (!parseInt(row.default_price)) {
        let matches = value.match(/(\d+)/);
        return matches[1];
      } else {
        return parseInt(value);
      }}
    else if (typeBefore === 'string' && typeAfter === 'boolean' ) { return boolCb ? (boolCb(value)) : (value === 'true' || value === '1' ? true : false ) }
    else if (typeBefore === 'number' && typeAfter === 'number' ) { return (Number(value)) }
    else if (typeBefore === 'number' && typeAfter === 'string' ) { return (value.toString()) }
    else if (typeBefore === 'number' && typeAfter === 'boolean' ) { value = Number(value); return boolCb ? (boolCb(value)) : (value === 1 ? true : false ) }
    else if (typeBefore === 'boolean' && typeAfter === 'string' ) { return (value.toString()) }
    else if (typeBefore === 'boolean' && typeAfter === 'number' ) { return (value ? 1 : 0) }
    else if (typeBefore === 'boolean' && typeAfter === 'boolean' ) { return (value ? true : false) }
}
