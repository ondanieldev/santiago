"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IStudentsRepository = _interopRequireDefault(require("../repositories/IStudentsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateStudentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('StudentsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IStudentsRepository.default === "undefined" ? Object : _IStudentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateStudentService {
  constructor(studentsRepository) {
    this.studentsRepository = studentsRepository;
  }

  async execute({
    id,
    ...rest
  }) {
    const student = await this.studentsRepository.findById(id);

    if (!student) {
      throw new _AppError.default('não é possível atualizar os dados de um aluno inexistente!');
    }

    Object.assign(student, rest);
    await this.studentsRepository.save(student);
    return student;
  }

}) || _class) || _class) || _class) || _class);
exports.default = UpdateStudentService;