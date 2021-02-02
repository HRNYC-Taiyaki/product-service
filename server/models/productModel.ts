import { ProductType } from './../types/types';
const sqlDb = require('../../db/index.ts');

module.exports = {
  getNProducts: (page = 0, n = 5) => {
      let offset = page * n;
      const limitString = (offset > 0)  ? `LIMIT ${n}, ${offset}` : `LIMIT ${n}`;
      return new Promise((resolve, reject) => {
        sqlDb.query(`SELECT * FROM Products ORDER BY id ${limitString}`, (err: any, res: ProductType, feilds: any) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(res);
          };
      });
    });
  }
}  