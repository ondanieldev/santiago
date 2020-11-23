"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Payment = _interopRequireDefault(require("../../infra/typeorm/entities/Payment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaymentsRepository {
  constructor() {
    this.payments = [];
  }

  async findById(id) {
    const payment = this.payments.find(findPayment => findPayment.id === id);
    return payment;
  }

  async findByContract(contract_id) {
    const payments = this.payments.filter(findPayment => findPayment.debit.contract_id === contract_id);
    return payments;
  }

  async create(data) {
    const payment = new _Payment.default();
    Object.assign(payment, data, {
      debit: {}
    });
    this.payments.push(payment);
    return payment;
  }

  async save(data) {
    const payment = this.payments.find(findPayment => findPayment.id === data.id);
    Object.assign(payment, data);
    return data;
  }

}

exports.default = PaymentsRepository;