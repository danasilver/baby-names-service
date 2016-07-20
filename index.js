const express = require('express');
const compression = require('compression');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');

const app = express();

const url = process.env.MONGODB_URI ||
  'mongodb://localhost:27017/baby-names-service';

app.use(compression());

if (process.env.NODE_ENV === 'production') {
  app.use(cors({origin: [/^http:\/\/localhost:/, /danasilver\.org$/]}));
}

app.get('/:name/:gender', (req, res) => {
  const {name, gender} = req.params;
  let db = null;

  MongoClient.connect(url)
  .then(_db => {
    db = _db;
    const names = db.collection('names');
    return names.find({name, gender}, {_id: 0}).toArray();
  })
  .then(documents => {
    if (documents.length) {
      res.json(documents);
    } else {
      res.sendStatus(404);
    }
    return db.close();
  })
  .catch(err => {
    res.sendStatus(500);
    throw err;
  });
});

app.get('/index', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.resolve(__dirname, 'data/generated-index.json'));
});

module.exports = app;
