"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _IndexUnpaidExtraDebitsByContractService = _interopRequireDefault(require("../../../../debits/services/IndexUnpaidExtraDebitsByContractService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContractExtraDebitsController {
  async index(request, response) {
    const {
      contract_id
    } = request.params;

    const indexUnpaidExtraDebitsByContract = _tsyringe.container.resolve(_IndexUnpaidExtraDebitsByContractService.default);

    const debits = await indexUnpaidExtraDebitsByContract.execute(contract_id);
    return response.json((0, _classTransformer.classToClass)(debits));
  }

}

var _default = ContractExtraDebitsController;
exports.default = _default;