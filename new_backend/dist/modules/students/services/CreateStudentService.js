"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IStudentsRepository = _interopRequireDefault(require("../repositories/IStudentsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateStudentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('StudentsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IStudentsRepository.default === "undefined" ? Object : _IStudentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateStudentService {
  constructor(studentsRepository) {
    this.studentsRepository = studentsRepository;
  }

  async execute(data) {
    const student = await this.studentsRepository.create(data);
    return student;
  }

}) || _class) || _class) || _class) || _class);
exports.default = CreateStudentService;