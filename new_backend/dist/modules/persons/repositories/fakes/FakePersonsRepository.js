"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Person = _interopRequireDefault(require("../../infra/typeorm/entities/Person"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PersonsRepository {
  constructor() {
    this.persons = [];
  }

  async findById(id) {
    const person = this.persons.find(findPerson => findPerson.id === id);
    return person;
  }

  async findByCpf(cpf) {
    const person = this.persons.find(findPerson => findPerson.cpf === cpf);
    return person;
  }

  async findByRgCpfOrEmail({
    cpf,
    email,
    rg
  }) {
    const person = this.persons.find(findPerson => findPerson.cpf === cpf || findPerson.email === email || findPerson.rg === rg);
    return person;
  }

  async create(data) {
    const person = new _Person.default();
    Object.assign(person, {
      id: (0, _uuid.v4)()
    }, data);
    this.persons.push(person);
    return person;
  }

  async save(data) {
    const person = this.persons.find(findPerson => findPerson.id === data.id);
    Object.assign(person, data);
    return data;
  }

  async updateUser(student_id, user_id) {
    const person = this.persons.find(findPerson => findPerson.id === student_id);
    Object.assign(person, {
      user_id
    });
    return person;
  }

  async dangerouslyDelete(id) {
    this.persons.filter(person => person.id !== id);
  }

}

exports.default = PersonsRepository;