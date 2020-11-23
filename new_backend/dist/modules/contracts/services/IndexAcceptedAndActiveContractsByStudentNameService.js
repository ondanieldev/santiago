"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IGradesRepository = _interopRequireDefault(require("../../grades/repositories/IGradesRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IContractsRepository = _interopRequireDefault(require("../repositories/IContractsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let IndexAcceptedAndActiveContractsByStudentNameService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('GradesRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default, typeof _IGradesRepository.default === "undefined" ? Object : _IGradesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class IndexAcceptedAndActiveContractsByStudentNameService {
  constructor(contractsRepository, gradesRepository) {
    this.contractsRepository = contractsRepository;
    this.gradesRepository = gradesRepository;
  }

  async execute(student_name, grade_id) {
    let contracts = [];
    const grade = await this.gradesRepository.findById(grade_id);

    if (!grade) {
      throw new _AppError.default('essa turma não existe!');
    }

    const parsedName = student_name.toLowerCase();
    contracts = await this.contractsRepository.findAcceptedAndActiveByStudentName(parsedName, grade_id);
    return contracts;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = IndexAcceptedAndActiveContractsByStudentNameService;
exports.default = _default;