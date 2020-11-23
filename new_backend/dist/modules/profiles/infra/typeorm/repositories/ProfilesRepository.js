"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Profile = _interopRequireDefault(require("../entities/Profile"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ProfilesRepository = (_dec = (0, _typeorm.EntityRepository)(_Profile.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class ProfilesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Profile.default);
  }

  async find() {
    const profiles = await this.ormRepository.find();
    return profiles;
  }

  async findById(id) {
    const profile = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return profile;
  }

  async findByName(name) {
    const profile = this.ormRepository.findOne({
      where: {
        name
      }
    });
    return profile;
  }

  async create(data) {
    const profile = this.ormRepository.create(data);
    await this.ormRepository.save(profile);
    return profile;
  }

  async save(data) {
    await this.ormRepository.save(data);
    return data;
  }

}, _temp)) || _class) || _class) || _class);
exports.default = ProfilesRepository;