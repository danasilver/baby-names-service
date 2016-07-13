const fs = require('fs');
const path = require('path');
const dsv = require('d3-dsv');

const parse = () => {
  const namesPath = path.resolve(__dirname, 'names1880-2012.csv');
  return dsv.csvParse(fs.readFileSync(namesPath, 'utf-8'));
};

module.exports = parse;
