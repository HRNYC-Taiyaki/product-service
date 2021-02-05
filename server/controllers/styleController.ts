const styleModel = require('../models/styleModel');

module.exports = {
    getStyles: async (req: any, res: any) => {  
      let result = await styleModel.getStyles(req.params.product_id);
      res.send(result).status(200);
    }

};