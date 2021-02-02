const express = require('express');
const app = express();
const { config } = require('../config.js');
const productRoutes = require('./routes/productRoutes.ts');
const bodyParser = require('body-parser');
const morgan = require('morgan');
let PORT = process.env.PORT || 3001;
let HOST = process.env.HOST || '127.0.0.1';
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', productRoutes);
app.listen(PORT, () => console.log(`listening on port http://${HOST}:${PORT}!`));
//# sourceMappingURL=index.js.map