"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IGradesRepository = _interopRequireDefault(require("../repositories/IGradesRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let FindGradeByIdService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('GradesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IGradesRepository.default === "undefined" ? Object : _IGradesRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindGradeByIdService {
  constructor(gradesRepository) {
    this.gradesRepository = gradesRepository;
  }

  async execute(id) {
    const grade = await this.gradesRepository.findById(id);

    if (!grade) {
      throw new _AppError.default('não é possível obter os dados de uma turma inexistente');
    }

    return grade;
  }

}) || _class) || _class) || _class) || _class);
exports.default = FindGradeByIdService;