"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _IndexDebitsByContractService = _interopRequireDefault(require("../../../../debits/services/IndexDebitsByContractService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContractDebitsController {
  async index(request, response) {
    const {
      contract_id
    } = request.params;

    const indexDebits = _tsyringe.container.resolve(_IndexDebitsByContractService.default);

    const debits = await indexDebits.execute(contract_id);
    return response.json((0, _classTransformer.classToClass)(debits));
  }

}

exports.default = ContractDebitsController;