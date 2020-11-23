"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IContractsRepository = _interopRequireDefault(require("../repositories/IContractsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let FindContractByIdService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindContractByIdService {
  constructor(contractsRepository) {
    this.contractsRepository = contractsRepository;
  }

  async execute(id) {
    const contract = await this.contractsRepository.findById(id);

    if (!contract) {
      throw new _AppError.default('a matrícula selecionada não existe!');
    }

    return contract;
  }

}) || _class) || _class) || _class) || _class);
exports.default = FindContractByIdService;