const sqlDb = require('../../db/index.ts');

module.exports = {
  getNProducts: (page = 0, n = 5) => {
      let offset = page * n;
      let response;
      if (offset > 0) {
        response = sqlDb.query(`SELECT * FROM Products LIMIT ${n}, ${offset}`);
        } else {
        response = sqlDb.query(`SELECT * FROM Products LIMIT ${n}`);
        }
        console.log( response );
  }
}