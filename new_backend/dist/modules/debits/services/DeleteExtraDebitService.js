"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IDebitsRepository = _interopRequireDefault(require("../repositories/IDebitsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteExtraDebitService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('DebitsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IDebitsRepository.default === "undefined" ? Object : _IDebitsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteExtraDebitService {
  constructor(debitsRepository) {
    this.debitsRepository = debitsRepository;
  }

  async execute(debit_id) {
    const debit = await this.debitsRepository.findById(debit_id);

    if (!debit) {
      throw new _AppError.default('não é possível excluir um débito que não existe!');
    }

    if (debit.type !== 'extra') {
      throw new _AppError.default('não é possível excluir um débito que não seja do tipo extra!');
    }

    if (debit.paid) {
      throw new _AppError.default('não é possível excluir um débito que já tenha sido pago!');
    }

    await this.debitsRepository.deleteTypeExtra(debit_id);
  }

}) || _class) || _class) || _class) || _class);
var _default = DeleteExtraDebitService;
exports.default = _default;