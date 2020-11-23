"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPersonsRepository = _interopRequireDefault(require("../repositories/IPersonsRepository"));

var _checkIfCPFIsValid = _interopRequireDefault(require("../../../shared/utils/checkIfCPFIsValid"));

var _checkIfCEPIsValid = _interopRequireDefault(require("../../../shared/utils/checkIfCEPIsValid"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePersonService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PersonsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPersonsRepository.default === "undefined" ? Object : _IPersonsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreatePersonService {
  constructor(personsRepository) {
    this.personsRepository = personsRepository;
  }

  async execute(data) {
    const validCEP = (0, _checkIfCEPIsValid.default)(data.address_cep);

    if (!validCEP) {
      throw new _AppError.default('CEP inválido! Certifique-se de digitar apenas os números.');
    }

    const validCPF = (0, _checkIfCPFIsValid.default)(data.cpf);

    if (!validCPF) {
      throw new _AppError.default('CPF inválido! Certifique-se de digitar apenas os números.');
    }

    const responsibleWithTheSameCredentials = await this.personsRepository.findByRgCpfOrEmail({
      rg: data.rg,
      cpf: data.cpf,
      email: data.email
    });

    if (responsibleWithTheSameCredentials) {
      throw new _AppError.default('não é possível criar um responsável com um CPF, RG ou e-mail que já está em uso!');
    }

    const responsible = await this.personsRepository.create(data);
    return responsible;
  }

}) || _class) || _class) || _class) || _class);
exports.default = CreatePersonService;