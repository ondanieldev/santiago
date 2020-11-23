"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Grade = _interopRequireDefault(require("../../infra/typeorm/entities/Grade"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GradesRepository {
  constructor() {
    this.grades = [];
  }

  async find() {
    return this.grades;
  }

  async findById(id) {
    const grade = this.grades.find(findGrade => findGrade.id === id);
    return grade;
  }

  async findByNameAndYear(name, year) {
    const grade = this.grades.find(findGrade => findGrade.name === name || findGrade.year === year);
    return grade;
  }

  async create(data) {
    const grade = new _Grade.default();
    Object.assign(grade, {
      id: (0, _uuid.v4)()
    }, data);
    this.grades.push(grade);
    return grade;
  }

  async save(data) {
    const grade = this.grades.find(findGrade => findGrade.id === data.id);
    Object.assign(grade, data);
    return data;
  }

}

exports.default = GradesRepository;