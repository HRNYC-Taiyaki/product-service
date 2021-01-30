const router = require('express').Router();
const controller = {};
const productController = require('../controllers/productController.ts');

router.get('/products', productController.getProducts);


module.exports = router;