"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IndexUnderAnalysisAndPendentContractsByStudentNameService = _interopRequireDefault(require("../../../services/IndexUnderAnalysisAndPendentContractsByStudentNameService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StudentsUnderAnalysisAndPendentContractsController {
  async index(request, response, _) {
    const {
      student_name
    } = request.query;
    const {
      grade_id
    } = request.params;

    const indexUnderAnalysisAndPendentContractsByStudentName = _tsyringe.container.resolve(_IndexUnderAnalysisAndPendentContractsByStudentNameService.default);

    const contracts = await indexUnderAnalysisAndPendentContractsByStudentName.execute(String(student_name), grade_id);
    return response.json(contracts);
  }

}

var _default = StudentsUnderAnalysisAndPendentContractsController;
exports.default = _default;