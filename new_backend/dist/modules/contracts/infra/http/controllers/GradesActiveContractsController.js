"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IndexActiveContractsByGradeIdService = _interopRequireDefault(require("../../../services/IndexActiveContractsByGradeIdService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GradesActiveContractsController {
  async index(request, response, _) {
    const {
      grade_id
    } = request.params;

    const indexActiveContractsByGradeId = _tsyringe.container.resolve(_IndexActiveContractsByGradeIdService.default);

    const contracts = await indexActiveContractsByGradeId.execute(grade_id);
    return response.json(contracts);
  }

}

var _default = GradesActiveContractsController;
exports.default = _default;