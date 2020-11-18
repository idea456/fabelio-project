const parse = require('papaparse');

function parseCSV() {
    const records = parse.parse('../intern-test-data.csv', {
        delimiter: ",",
       header: true 
    })
    console.log(records);
    return records;
}


module.exports.parseCSV = parseCSV;