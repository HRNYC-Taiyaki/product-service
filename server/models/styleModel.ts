import { exampleStyle } from './../types/exampleStyle';
import { SkusObj, Result, Style, PhotosObj } from './../types/types';
const sqlDb = require('../../db/index');

module.exports = {
    getStyles: (id: number) => {
        let output: Style = exampleStyle;
        output.product_id = id;
      return new Promise((resolve, reject) => {
          sqlDb.query(`SELECT id, name, sale_price, original_price, default_style FROM Styles WHERE product_id = ${id}`, (err:any, res:any, fields:any) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                output.results = res;
                let styleIdString: string = ``;
                res.forEach((item:{id: number}) => {
                    styleIdString.length === 0 ? styleIdString += `${item.id}` : styleIdString += ` OR style_id = ${item.id}`;
                });
                sqlDb.query(`SELECT style_id, url, thumbnail_url FROM Photos USE INDEX (idx_style_id) WHERE style_id = ${styleIdString}`, (err:any, res:any, fields:any) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        output.results.forEach((i:any) => {
                            if (!Array.isArray(i.photos)) { i.photos = [] }   
                            i.default_style.data === 1 ? i.default_style = true : i.default_style = false;                       
                            res.forEach((j:any) => {
                                if (i.id === j.style_id) {
                                    i.photos.push({
                                        thumbnail_url: j.thumbnail_url,
                                        url: j.url
                                    });
                                }
                            });
                        });
                        sqlDb.query(`SELECT * FROM Style_Skus USE INDEX (idx_skus_style_id) WHERE style_id = ${styleIdString}`, (err:any, res:any, fields:any) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            } else {
                                output.results.forEach((i:any) => {
                                    if (!Array.isArray(i.skus)) { i.skus = {} }                      
                                    res.forEach((j:any) => {
                                        if (i.id === j.style_id) {
                                            i.skus[j.id] = {
                                                quantity: j.quantity,
                                                size: j.size
                                            };
                                        }
                                    });
                                });
                                resolve(output); 
                            }
                        });
                    }
                })
            }
        });
    })
  }
}