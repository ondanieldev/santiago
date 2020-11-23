"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IStudentsRepository = _interopRequireDefault(require("../../students/repositories/IStudentsRepository"));

var _IPersonsRepository = _interopRequireDefault(require("../../persons/repositories/IPersonsRepository"));

var _IRelationshipsRepository = _interopRequireDefault(require("../repositories/IRelationshipsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreaterelationshipService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RelationshipsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StudentsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('PersonsRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IRelationshipsRepository.default === "undefined" ? Object : _IRelationshipsRepository.default, typeof _IStudentsRepository.default === "undefined" ? Object : _IStudentsRepository.default, typeof _IPersonsRepository.default === "undefined" ? Object : _IPersonsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreaterelationshipService {
  constructor(relationshipsRepository, studentsRepository, personsRepository) {
    this.relationshipsRepository = relationshipsRepository;
    this.studentsRepository = studentsRepository;
    this.personsRepository = personsRepository;
  }

  async execute({
    student_id,
    person_id,
    kinship
  }) {
    const student = await this.studentsRepository.findById(student_id);

    if (!student) {
      throw new _AppError.default('não é possível criar um relacinamento com um aluno inexistente!');
    }

    const person = await this.personsRepository.findById(person_id);

    if (!person) {
      throw new _AppError.default('não é possível criar um relacinamento com um responsável inexistente!');
    }

    const relationship = await this.relationshipsRepository.create({
      kinship,
      person_id,
      student_id
    });
    return relationship;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreaterelationshipService;