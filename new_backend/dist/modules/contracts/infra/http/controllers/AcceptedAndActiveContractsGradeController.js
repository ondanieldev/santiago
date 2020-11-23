"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IndexAcceptedAndActiveContractsByGradeIdService = _interopRequireDefault(require("../../../services/IndexAcceptedAndActiveContractsByGradeIdService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AcceptedAndActiveContractsGradeController {
  async index(request, response, _) {
    const {
      grade_id
    } = request.params;

    const indexAcceptedAndActiveContractsByGrade = _tsyringe.container.resolve(_IndexAcceptedAndActiveContractsByGradeIdService.default);

    const contracts = await indexAcceptedAndActiveContractsByGrade.execute(grade_id);
    return response.json(contracts);
  }

}

var _default = AcceptedAndActiveContractsGradeController;
exports.default = _default;