"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IDebitsRepository = _interopRequireDefault(require("../repositories/IDebitsRepository"));

var _IContractsRepository = _interopRequireDefault(require("../../contracts/repositories/IContractsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let IndexDebitsByContractService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('DebitsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IDebitsRepository.default === "undefined" ? Object : _IDebitsRepository.default, typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class IndexDebitsByContractService {
  constructor(debitsRepository, contractsRepository) {
    this.debitsRepository = debitsRepository;
    this.contractsRepository = contractsRepository;
  }

  async execute(contract_id) {
    const contract = await this.contractsRepository.findById(contract_id);

    if (!contract) {
      throw new _AppError.default('não é possível listar os débitos de um contrato inexistente!');
    }

    if (contract.status !== 'accepted' && contract.status !== 'active') {
      throw new _AppError.default('não é possível listar os débitos de um contrato que não foi aprovado!');
    }

    const debits = await this.debitsRepository.findByContract(contract_id);
    return debits;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = IndexDebitsByContractService;