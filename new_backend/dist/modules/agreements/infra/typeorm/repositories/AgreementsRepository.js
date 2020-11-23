"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Agreement = _interopRequireDefault(require("../entities/Agreement"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UsersRepository = (_dec = (0, _typeorm.EntityRepository)(_Agreement.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Agreement.default);
  }

  async findById(id) {
    const agreement = await this.ormRepository.findOne({
      where: {
        id
      },
      relations: ['person']
    });
    return agreement;
  }

  async create(data) {
    const agreement = this.ormRepository.create(data);
    await this.ormRepository.save(agreement);
    return agreement;
  }

  async dangerouslyDelete(id) {
    await this.ormRepository.createQueryBuilder().delete().where('id = :id', {
      id
    }).execute();
  }

}, _temp)) || _class) || _class) || _class);
exports.default = UsersRepository;