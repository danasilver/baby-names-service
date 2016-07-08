const csv = require('dsv').csv;
const express = require('express');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

const app = express();

app.get('/:name/:gender', (req, res) => {
  const {name, gender} = req.params;
  lookup(name, gender)
  .then((names) => { res.json(names); });
});

const lookup = (name, gender) => {
  return fs.readFileAsync('./names1880-2012.csv', 'utf-8')
  .then(names => {
    names = csv.parse(names);

    return names.filter(n => n.name === name && n.gender === gender);
  });
};

module.exports = app;
