"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IStudentsRepository = _interopRequireDefault(require("../../students/repositories/IStudentsRepository"));

var _IGradesRepository = _interopRequireDefault(require("../../grades/repositories/IGradesRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IContractsRepository = _interopRequireDefault(require("../repositories/IContractsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateContractService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StudentsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('GradesRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default, typeof _IStudentsRepository.default === "undefined" ? Object : _IStudentsRepository.default, typeof _IGradesRepository.default === "undefined" ? Object : _IGradesRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class CreateContractService {
  constructor(contractsRepository, studentsRepository, gradesRepository, cacheProvider) {
    this.contractsRepository = contractsRepository;
    this.studentsRepository = studentsRepository;
    this.gradesRepository = gradesRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    student_id,
    grade_id
  }) {
    const checkIfStudentExists = await this.studentsRepository.findById(student_id);

    if (!checkIfStudentExists) {
      throw new _AppError.default('não é possível criar uma matrícula sem um aluno!');
    }

    const checkIfGradeExists = await this.gradesRepository.findById(grade_id);

    if (!checkIfGradeExists) {
      throw new _AppError.default('não é possível matrícular um aluno em uma turma inexistente!');
    }

    const contract = await this.contractsRepository.create({
      grade_id,
      student_id
    });
    await this.cacheProvider.invalidate(`under-analysis-and-pendent-contracts:${grade_id}`);
    return contract;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateContractService;