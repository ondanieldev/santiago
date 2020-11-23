"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Debit = _interopRequireDefault(require("../../infra/typeorm/entities/Debit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DebitsRepository {
  constructor() {
    this.debits = [];
  }

  async findById(id) {
    const debit = this.debits.find(findDebit => findDebit.id === id);
    return debit;
  }

  async findByContract(contract_id) {
    const debits = this.debits.filter(debit => debit.contract_id === contract_id);
    return debits;
  }

  async create(data) {
    const debit = new _Debit.default();
    Object.assign(debit, data, {
      id: (0, _uuid.v4)()
    });
    this.debits.push(debit);
    return debit;
  }

  async save(data) {
    const debit = this.debits.find(findDebit => findDebit.id === data.id);
    Object.assign(data, debit);
    return data;
  }

  async deleteTypeExtra(debit_id) {
    this.debits = this.debits.filter(debit => debit.id !== debit_id);
  }

  async findUnpaidExtraByContract(contract_id) {
    return this.debits.filter(debit => debit.type === 'extra' && debit.contract_id === contract_id && !debit.paid);
  }

}

exports.default = DebitsRepository;