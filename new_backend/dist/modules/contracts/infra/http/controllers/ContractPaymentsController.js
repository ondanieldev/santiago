"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _IndexPaymentsByContractService = _interopRequireDefault(require("../../../../payments/services/IndexPaymentsByContractService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContractPaymentsController {
  async index(request, response) {
    const {
      contract_id
    } = request.params;

    const indexPayments = _tsyringe.container.resolve(_IndexPaymentsByContractService.default);

    const payments = await indexPayments.execute(contract_id);
    return response.json((0, _classTransformer.classToClass)(payments));
  }

}

exports.default = ContractPaymentsController;