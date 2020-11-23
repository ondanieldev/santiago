"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IndexContractsMatchesStudentNameService = _interopRequireDefault(require("../../../services/IndexContractsMatchesStudentNameService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StudentsContractsController {
  async index(request, response, _) {
    const {
      student_name
    } = request.params;

    const indexContractsMatchesStudentName = _tsyringe.container.resolve(_IndexContractsMatchesStudentNameService.default);

    const parsedStudentName = student_name.toLowerCase();
    const contracts = await indexContractsMatchesStudentName.execute(parsedStudentName);
    return response.json(contracts);
  }

}

exports.default = StudentsContractsController;