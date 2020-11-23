"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateExtraDebitService = _interopRequireDefault(require("../../../services/CreateExtraDebitService"));

var _DeleteExtraDebitService = _interopRequireDefault(require("../../../services/DeleteExtraDebitService"));

var _UpdateExtraDebitService = _interopRequireDefault(require("../../../services/UpdateExtraDebitService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ExtraDebitsController {
  async create(request, response, _) {
    const {
      contract_id,
      description,
      payment_limit_date,
      value,
      discount,
      apply_interest_rules
    } = request.body;

    const createExtraDebit = _tsyringe.container.resolve(_CreateExtraDebitService.default);

    const debit = await createExtraDebit.execute({
      contract_id,
      description,
      payment_limit_date,
      value,
      discount,
      apply_interest_rules
    });
    return response.json(debit);
  }

  async delete(request, response, _) {
    const {
      debit_id
    } = request.params;

    const deleteExtraDebit = _tsyringe.container.resolve(_DeleteExtraDebitService.default);

    await deleteExtraDebit.execute(debit_id);
    return response.status(204).json();
  }

  async update(request, response, _) {
    const {
      debit_id
    } = request.params;
    const {
      description,
      payment_limit_date,
      value,
      discount,
      apply_interest_rules
    } = request.body;

    const updateExtraDebit = _tsyringe.container.resolve(_UpdateExtraDebitService.default);

    const debit = await updateExtraDebit.execute({
      id: debit_id,
      description,
      payment_limit_date,
      value,
      discount,
      apply_interest_rules
    });
    return response.json(debit);
  }

}

var _default = ExtraDebitsController;
exports.default = _default;