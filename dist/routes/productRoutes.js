const router = require('express').Router();
const controller = {};
const productController = require('../controllers/productController.ts');
const singleProductController = require('../controllers/singleProductController.ts');
const styleController = require('../controllers/styleController');
router.get('/products', productController.getProducts);
router.get('/products/:product_id', singleProductController.getSingleProduct);
router.get('/products/:product_id/styles', styleController.getStyles);
router.options('/', (req, res) => {
    res.sendStatus(200);
});
module.exports = router;
//# sourceMappingURL=productRoutes.js.map