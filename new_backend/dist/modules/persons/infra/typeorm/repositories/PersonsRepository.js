"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Person = _interopRequireDefault(require("../entities/Person"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let PersonsRepository = (_dec = (0, _typeorm.EntityRepository)(_Person.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class PersonsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Person.default);
  }

  async findById(id) {
    const person = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return person;
  }

  async findByCpf(cpf) {
    const person = await this.ormRepository.findOne({
      where: {
        cpf
      }
    });
    return person;
  }

  async findByRgCpfOrEmail({
    cpf,
    email,
    rg
  }) {
    const person = await this.ormRepository.findOne({
      where: [{
        email
      }, {
        cpf
      }, {
        rg
      }]
    });
    return person;
  }

  async create(data) {
    const person = this.ormRepository.create(data);
    await this.ormRepository.save(person);
    return person;
  }

  async save(data) {
    const person = await this.ormRepository.save(data);
    return person;
  }

  async updateUser(person_id, user_id) {
    const person = await this.ormRepository.findOne({
      where: {
        id: person_id
      }
    });

    if (person) {
      Object.assign(person, {
        user_id
      });
      await this.ormRepository.save(person);
    }

    return person;
  }

  async dangerouslyDelete(id) {
    await this.ormRepository.createQueryBuilder().delete().where('id = :id', {
      id
    }).execute();
  }

}, _temp)) || _class) || _class) || _class);
exports.default = PersonsRepository;