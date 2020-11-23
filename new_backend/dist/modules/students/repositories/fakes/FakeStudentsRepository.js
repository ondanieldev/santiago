"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Student = _interopRequireDefault(require("../../infra/typeorm/entities/Student"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StudentsRepository {
  constructor() {
    this.students = [];
  }

  async findById(id) {
    const student = this.students.find(findStudent => findStudent.id === id);
    return student;
  }

  async create(data) {
    const student = new _Student.default();
    Object.assign(student, {
      id: (0, _uuid.v4)()
    }, data);
    this.students.push(student);
    return student;
  }

  async save(data) {
    const student = this.students.find(findStudent => findStudent.id === data.id);
    Object.assign(student, data);
    return data;
  }

  async updateUser(student_id, user_id) {
    const student = this.students.find(findStudent => findStudent.id === student_id);
    Object.assign(student, {
      user_id
    });
    return student;
  }

  async dangerouslyDelete(id) {
    this.students.filter(student => student.id !== id);
  }

}

exports.default = StudentsRepository;