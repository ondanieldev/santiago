"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IGradesRepository = _interopRequireDefault(require("../../grades/repositories/IGradesRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IContractsRepository = _interopRequireDefault(require("../repositories/IContractsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateContractGradeService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('GradesRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default, typeof _IGradesRepository.default === "undefined" ? Object : _IGradesRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class UpdateContractGradeService {
  constructor(contractsRepository, gradesRepository, cacheProvider) {
    this.contractsRepository = contractsRepository;
    this.gradesRepository = gradesRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    contract_id,
    grade_id
  }) {
    const contract = await this.contractsRepository.findById(contract_id);

    if (!contract) {
      throw new _AppError.default('não é possível atualizar a turma de um contrato inexistente!');
    }

    if (contract.status !== 'pendent' && contract.status !== 'underAnalysis') {
      throw new _AppError.default('não é possível atualizar a turma de um contrato que já foi aceito ou já está ativo!');
    }

    const grade = await this.gradesRepository.findById(grade_id);

    if (!grade) {
      throw new _AppError.default('não é possível atualizar o contrato com uma turma inexistente!');
    }

    await this.cacheProvider.invalidate(`under-analysis-and-pendent-contracts:${contract.grade_id}`);
    contract.grade = grade;
    await this.contractsRepository.save(contract);
    await this.cacheProvider.invalidate(`under-analysis-and-pendent-contracts:${grade_id}`);
    return contract;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateContractGradeService;