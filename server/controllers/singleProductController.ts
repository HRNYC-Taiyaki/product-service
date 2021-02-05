const singleProductModel = require('../models/singleProductModel');

module.exports = {
    getSingleProduct: async (req: any, res: any) => {  
      let result = await singleProductModel.getProductInfo(req.params.product_id);
      res.send(result).status(200);
    }

};