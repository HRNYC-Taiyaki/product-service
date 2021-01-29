const express = require('express');
const app = express();
const mysql = require('mysql');
const {config} = require('../config.js');

app.get('/', (req, res) => {
  res.send('Hello world!');
});


app.listen(3001, () => console.log('listening on port 3001!'));