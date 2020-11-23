"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IGradesRepository = _interopRequireDefault(require("../repositories/IGradesRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let IndexGradesService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('GradesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IGradesRepository.default === "undefined" ? Object : _IGradesRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class IndexGradesService {
  constructor(gradesRepository, cacheProvider) {
    this.gradesRepository = gradesRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute() {
    let grades = await this.cacheProvider.recovery('grades');

    if (!grades) {
      grades = await this.gradesRepository.find();
      await this.cacheProvider.register('grades', grades);
    }

    return grades;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = IndexGradesService;