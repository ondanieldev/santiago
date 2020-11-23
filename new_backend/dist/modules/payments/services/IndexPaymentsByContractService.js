"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IPaymentsRepository = _interopRequireDefault(require("../repositories/IPaymentsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let IndexPaymentsByContractService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PaymentsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPaymentsRepository.default === "undefined" ? Object : _IPaymentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class IndexPaymentsByContractService {
  constructor(paymentsRepository) {
    this.paymentsRepository = paymentsRepository;
  }

  async execute(contract_id) {
    const payments = await this.paymentsRepository.findByContract(contract_id);
    return payments;
  }

}) || _class) || _class) || _class) || _class);
exports.default = IndexPaymentsByContractService;