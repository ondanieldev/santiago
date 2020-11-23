"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IContractsRepository = _interopRequireDefault(require("../../contracts/repositories/IContractsRepository"));

var _IDebitsRepository = _interopRequireDefault(require("../repositories/IDebitsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateExtraDebitService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('DebitsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IDebitsRepository.default === "undefined" ? Object : _IDebitsRepository.default, typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateExtraDebitService {
  constructor(debitsRepository, contractsRepository) {
    this.debitsRepository = debitsRepository;
    this.contractsRepository = contractsRepository;
  }

  async execute({
    contract_id,
    description,
    payment_limit_date,
    value,
    discount,
    apply_interest_rules
  }) {
    const contract = await this.contractsRepository.findById(contract_id);

    if (!contract) {
      throw new _AppError.default('não é possível criar um débito para um contrato inexistente!');
    }

    if (contract.status !== 'active') {
      throw new _AppError.default('não é possível criar um débito para um contrato que ainda não está ativo!');
    }

    if ((0, _dateFns.isPast)(payment_limit_date)) {
      throw new _AppError.default('não é possível criar um débito com uma data limite que já passou!');
    }

    if (discount && discount < 0) {
      throw new _AppError.default('não é possível criar um débito com um desconto negativo!');
    }

    if (value < 0) {
      throw new _AppError.default('não é possível criar um débito com um valor negativo!');
    }

    const debit = await this.debitsRepository.create({
      contract_id,
      description,
      payment_limit_date,
      value,
      discount,
      type: 'extra',
      apply_interest_rules
    });
    return debit;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateExtraDebitService;
exports.default = _default;