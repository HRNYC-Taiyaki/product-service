const router = require('express').Router();
const controller = {};
const productController = require('../controllers/productController');
const singleProductController = require('../controllers/singleProductController');
const styleController = require('../controllers/styleController');

router.get('/products', productController.getProducts);
router.get('/products/:product_id', singleProductController.getSingleProduct);
router.get('/products/:product_id/styles', styleController.getStyles);
router.options('/', (req: any, res: any) => {
    res.sendStatus(200);
})


module.exports = router;