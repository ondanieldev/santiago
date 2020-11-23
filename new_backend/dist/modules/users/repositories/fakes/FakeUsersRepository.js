"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.users = [];
  }

  async find() {
    return this.users;
  }

  async findById(id) {
    const user = this.users.find(findUser => findUser.id === id);
    return user;
  }

  async findByUsername(username) {
    const user = this.users.find(findUser => findUser.username === username);
    return user;
  }

  async create(data) {
    const user = new _User.default();
    Object.assign(user, data, {
      id: (0, _uuid.v4)(),
      profile: {}
    });
    this.users.push(user);
    return user;
  }

  async save(data) {
    const user = this.users.find(findUser => findUser.id === data.id);
    Object.assign(user, data);
    return data;
  }

}

exports.default = UsersRepository;