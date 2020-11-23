"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IndexUnderAnalysisAndPendentContractsByGradeIdService = _interopRequireDefault(require("../../../services/IndexUnderAnalysisAndPendentContractsByGradeIdService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnderAnalysisAndPendentContractsGradeController {
  async index(request, response, _) {
    const {
      grade_id
    } = request.params;

    const indexUnderAnalysisAndPendentContractsByGradeId = _tsyringe.container.resolve(_IndexUnderAnalysisAndPendentContractsByGradeIdService.default);

    const contracts = await indexUnderAnalysisAndPendentContractsByGradeId.execute(grade_id);
    return response.json(contracts);
  }

}

var _default = UnderAnalysisAndPendentContractsGradeController;
exports.default = _default;