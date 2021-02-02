import { ProductType, Featured, Feature} from './../types/types';
const exampleProduct = require('./../types/exampleFeatured');
const sqlDb = require('../../db/index.ts');

module.exports = {
  getProductInfo: (id: number) => {
    return new Promise((resolve, reject) => {
      let output: Featured = exampleProduct;
      sqlDb.query(`SELECT * FROM Products WHERE id = ${id}`, (err: any, res: ProductType, feilds: any) => {
        if (err) {
            console.log(err);
            reject(err);
        } else {
        let stringy = JSON.stringify(res).slice(1,-1);
        let response = JSON.parse(stringy);
        output.id = response.id;
        output.name = response.name;
        output.slogan = response.slogan;
        output.description = response.description;
        output.category = response.category;
        output.default_price = response.default_price;
        sqlDb.query(`SELECT feature, value FROM Features WHERE product_id = ${id} ORDER BY id`, (err: any, res: Feature, feilds: any) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
               output.features = (JSON.parse(JSON.stringify(res)));
              resolve(output);
            };
          });
        };
      })
    });
  }
}  