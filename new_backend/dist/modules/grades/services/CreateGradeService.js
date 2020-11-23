"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IGradesRepository = _interopRequireDefault(require("../repositories/IGradesRepository"));

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateGradeService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('GradesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IGradesRepository.default === "undefined" ? Object : _IGradesRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateGradeService {
  constructor(gradesRepository, cacheProvider) {
    this.gradesRepository = gradesRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    name,
    value,
    year
  }) {
    const gradeWithTheSameNameAndYear = await this.gradesRepository.findByNameAndYear(name, year);

    if (gradeWithTheSameNameAndYear) {
      throw new _AppError.default('não é possível criar uma turma com o mesmo conjunto de nome e ano de outra!');
    }

    const grade = await this.gradesRepository.create({
      name,
      value,
      year
    });
    await this.cacheProvider.invalidate('grades');
    return grade;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateGradeService;