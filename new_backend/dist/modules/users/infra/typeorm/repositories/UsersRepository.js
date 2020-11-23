"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../entities/User"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UsersRepository = (_dec = (0, _typeorm.EntityRepository)(_User.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async find() {
    const users = await this.ormRepository.find();
    return users;
  }

  async findById(id) {
    const user = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return user;
  }

  async findByUsername(username) {
    const user = await this.ormRepository.findOne({
      where: {
        username
      },
      relations: ['profile']
    });
    return user;
  }

  async create(data) {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }

  async save(data) {
    await this.ormRepository.save(data);
    return data;
  }

}, _temp)) || _class) || _class) || _class);
exports.default = UsersRepository;