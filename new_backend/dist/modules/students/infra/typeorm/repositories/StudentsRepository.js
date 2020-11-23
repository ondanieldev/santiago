"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Student = _interopRequireDefault(require("../entities/Student"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let StudentsRepository = (_dec = (0, _typeorm.EntityRepository)(_Student.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class StudentsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Student.default);
  }

  async findById(id) {
    const student = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return student;
  }

  async create(data) {
    const student = this.ormRepository.create(data);
    await this.ormRepository.save(student);
    return student;
  }

  async save(data) {
    const student = await this.ormRepository.save(data);
    return student;
  }

  async updateUser(student_id, user_id) {
    const student = await this.ormRepository.findOne({
      where: {
        id: student_id
      }
    });

    if (student) {
      Object.assign(student, {
        user_id
      });
      await this.ormRepository.save(student);
    }

    return student;
  }

  async dangerouslyDelete(id) {
    await this.ormRepository.createQueryBuilder().delete().where('id = :id', {
      id
    }).execute();
  }

}, _temp)) || _class) || _class) || _class);
exports.default = StudentsRepository;