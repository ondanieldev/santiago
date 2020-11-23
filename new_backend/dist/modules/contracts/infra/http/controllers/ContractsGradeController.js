"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateContractGradeService = _interopRequireDefault(require("../../../services/UpdateContractGradeService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContractsGradeController {
  async update(request, response, _) {
    const {
      contract_id
    } = request.params;
    const {
      grade_id
    } = request.body;

    const updateContractGrade = _tsyringe.container.resolve(_UpdateContractGradeService.default);

    const contract = await updateContractGrade.execute({
      contract_id,
      grade_id
    });
    return response.json(contract);
  }

}

exports.default = ContractsGradeController;