"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IDebitsRepository = _interopRequireDefault(require("../repositories/IDebitsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateExtraDebitService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('DebitsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IDebitsRepository.default === "undefined" ? Object : _IDebitsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateExtraDebitService {
  constructor(debitsRepository) {
    this.debitsRepository = debitsRepository;
  }

  async execute({
    id,
    description,
    payment_limit_date,
    value,
    discount,
    apply_interest_rules
  }) {
    const debitExists = await this.debitsRepository.findById(id);

    if (!debitExists) {
      throw new _AppError.default('não é possível editar um débito que não existe!');
    }

    if (debitExists.paid) {
      throw new _AppError.default('não é possível editar um débito que já foi pago!');
    }

    if (debitExists.type !== 'extra') {
      throw new _AppError.default('não é possível editar um débito que não seja do tipo extra!');
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

    Object.assign(debitExists, {
      description,
      payment_limit_date,
      value,
      discount,
      apply_interest_rules
    });
    const debit = await this.debitsRepository.save(debitExists);
    return debit;
  }

}) || _class) || _class) || _class) || _class);
var _default = UpdateExtraDebitService;
exports.default = _default;