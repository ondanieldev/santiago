"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IndexAcceptedAndActiveContractsByStudentNameService = _interopRequireDefault(require("../../../services/IndexAcceptedAndActiveContractsByStudentNameService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StudentsAcceptedAndActiveContractsController {
  async index(request, response, _) {
    const {
      student_name
    } = request.query;
    const {
      grade_id
    } = request.params;

    const indexAcceptedAndActiveContractsByStudentName = _tsyringe.container.resolve(_IndexAcceptedAndActiveContractsByStudentNameService.default);

    const contracts = await indexAcceptedAndActiveContractsByStudentName.execute(String(student_name), grade_id);
    return response.json(contracts);
  }

}

var _default = StudentsAcceptedAndActiveContractsController;
exports.default = _default;