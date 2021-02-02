const express = require('express');
const app = express();
const {config} = require('../config.js');
const productRoutes = require('./routes/productRoutes.ts');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(function(req:any, res:any, next:any) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', productRoutes);





app.listen(3001, () => console.log('listening on port 3001!'));