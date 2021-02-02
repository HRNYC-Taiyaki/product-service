var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const styleModel = require('../models/styleModel.ts');
module.exports = {
    getStyles: (req, res) => __awaiter(this, void 0, void 0, function* () {
        let result = yield styleModel.getStyles(req.params.product_id);
        res.send(result).status(200);
    })
};
//# sourceMappingURL=styleController.js.map