"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IContractsRepository = _interopRequireDefault(require("../../contracts/repositories/IContractsRepository"));

var _IPersonsRepository = _interopRequireDefault(require("../../persons/repositories/IPersonsRepository"));

var _IAgreementsRepository = _interopRequireDefault(require("../repositories/IAgreementsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAgreementService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AgreementsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('PersonsRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IAgreementsRepository.default === "undefined" ? Object : _IAgreementsRepository.default, typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default, typeof _IPersonsRepository.default === "undefined" ? Object : _IPersonsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateAgreementService {
  constructor(agreementsRepository, contractsRepository, personsRepository) {
    this.agreementsRepository = agreementsRepository;
    this.contractsRepository = contractsRepository;
    this.personsRepository = personsRepository;
  }

  async execute({
    contract_id,
    person_id,
    responsible_type
  }) {
    const contract = await this.contractsRepository.findById(contract_id);

    if (!contract) {
      throw new _AppError.default('não é possível criar um acordo com um contrato inexistente!');
    }

    const person = await this.personsRepository.findById(person_id);

    if (!person) {
      throw new _AppError.default('não é possível criar um acordo com um responsável inexistente!');
    }

    const agreement = await this.agreementsRepository.create({
      contract_id,
      person_id,
      responsible_type
    });
    return agreement;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateAgreementService;