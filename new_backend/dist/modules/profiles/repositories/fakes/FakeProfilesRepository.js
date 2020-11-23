"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Profile = _interopRequireDefault(require("../../infra/typeorm/entities/Profile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfilesRepository {
  constructor() {
    this.profiles = [];
  }

  async find() {
    return this.profiles;
  }

  async findById(id) {
    const profile = this.profiles.find(findProfile => findProfile.id === id);
    return profile;
  }

  async findByName(name) {
    const profile = this.profiles.find(findProfile => findProfile.name === name);
    return profile;
  }

  async create(data) {
    const profile = new _Profile.default();
    Object.assign(profile, data, {
      id: (0, _uuid.v4)()
    });
    this.profiles.push(profile);
    return profile;
  }

  async save(data) {
    const profile = this.profiles.find(findProfile => findProfile.id === data.id);
    Object.assign(profile, data);
    return data;
  }

}

exports.default = ProfilesRepository;