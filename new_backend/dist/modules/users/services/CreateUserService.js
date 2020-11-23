"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IProfilesRepository = _interopRequireDefault(require("../../profiles/repositories/IProfilesRepository"));

var _IHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/models/IHashProvider"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ProfilesRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IProfilesRepository.default === "undefined" ? Object : _IProfilesRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class CreateUserService {
  constructor(usersRepository, profilesRepository, hashProvider, cacheProvider) {
    this.usersRepository = usersRepository;
    this.profilesRepository = profilesRepository;
    this.hashProvider = hashProvider;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    username,
    password,
    profile_id
  }) {
    const checkIfProfilesExists = await this.profilesRepository.findById(profile_id);

    if (!checkIfProfilesExists) {
      throw new _AppError.default('não é possível criar um usuário associado a um perfil inexistente!');
    }

    const userWithSameUsername = await this.usersRepository.findByUsername(username);

    if (userWithSameUsername) {
      throw new _AppError.default('não é possível criar um usuário com um nome de usuário que já está em uso!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      username,
      password: hashedPassword,
      profile_id
    });
    await this.cacheProvider.invalidate('users');
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateUserService;