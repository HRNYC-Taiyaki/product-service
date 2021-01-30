const productModel = require('../models/productModel.ts');

module.exports = {
    getProducts: async(req, res) => {
      let response = await productModel.getNProducts();
      res.send(response).status(200);
    }
}