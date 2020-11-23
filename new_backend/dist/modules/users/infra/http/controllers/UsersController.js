"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _IndexUsersService = _interopRequireDefault(require("../../../services/IndexUsersService"));

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _UpdateUserService = _interopRequireDefault(require("../../../services/UpdateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async index(request, response) {
    const indexUsers = _tsyringe.container.resolve(_IndexUsersService.default);

    const users = await indexUsers.execute();
    return response.json((0, _classTransformer.classToClass)(users));
  }

  async create(request, response) {
    const {
      username,
      password,
      profile_id
    } = request.body;

    const createUser = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUser.execute({
      username,
      password,
      profile_id
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async update(request, response) {
    const {
      user_id
    } = request.params;
    const {
      username,
      password,
      profile_id
    } = request.body;

    const updateUser = _tsyringe.container.resolve(_UpdateUserService.default);

    const user = await updateUser.execute({
      id: user_id,
      username,
      password,
      profile_id
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UsersController;