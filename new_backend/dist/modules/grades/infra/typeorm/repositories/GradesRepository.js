"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Grade = _interopRequireDefault(require("../entities/Grade"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let GradesRepository = (_dec = (0, _typeorm.EntityRepository)(_Grade.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class GradesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Grade.default);
  }

  async find() {
    const grades = await this.ormRepository.find();
    return grades;
  }

  async findById(id) {
    const grade = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return grade;
  }

  async findByNameAndYear(name, year) {
    const grade = await this.ormRepository.findOne({
      where: [{
        name,
        year
      }]
    });
    return grade;
  }

  async create(data) {
    const grade = this.ormRepository.create(data);
    await this.ormRepository.save(grade);
    return grade;
  }

  async save(data) {
    await this.ormRepository.save(data);
    return data;
  }

}, _temp)) || _class) || _class) || _class);
exports.default = GradesRepository;