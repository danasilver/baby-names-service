const assert = require('assert');
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const app = require('..');

const expected = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dana_f.json'), 'utf-8'));

request(app)
  .get('/Dana/F')
  .expect('Content-Type', /json/)
  .expect(200)
  .end((err, res) => {
    if (err) throw err;
    assert.deepEqual(res.body, expected);
  });

request(app)
  .get('/Dana/G')
  .expect(404)
  .end((err, res) => {
    if (err) throw err;
  });

request(app)
  .get('/')
  .expect(404)
  .end((err, res) => {
    if (err) throw err;
  });

request(app)
  .get('/index')
  .expect('Content-Type', /json/)
  .expect(200)
  .end((err, res) => {
    if (err) throw err;
    const expected = {name: 'Mary', gender: 'F'};
    assert.deepEqual(res.body[0], expected);
  })
