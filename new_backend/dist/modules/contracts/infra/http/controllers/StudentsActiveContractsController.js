"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IndexActiveContractsByStudentNameService = _interopRequireDefault(require("../../../services/IndexActiveContractsByStudentNameService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StudentsActiveContractsController {
  async index(request, response, _) {
    const {
      student_name
    } = request.query;
    const {
      grade_id
    } = request.params;

    const indexActiveContractsByStudentName = _tsyringe.container.resolve(_IndexActiveContractsByStudentNameService.default);

    const contracts = await indexActiveContractsByStudentName.execute(String(student_name), grade_id);
    return response.json(contracts);
  }

}

var _default = StudentsActiveContractsController;
exports.default = _default;