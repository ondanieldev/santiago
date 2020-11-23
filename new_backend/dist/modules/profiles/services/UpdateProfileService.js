"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IProfilesRepository = _interopRequireDefault(require("../repositories/IProfilesRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProfilesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProfilesRepository.default === "undefined" ? Object : _IProfilesRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateProfileService {
  constructor(profilesRepository, cacheProvider) {
    this.profilesRepository = profilesRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute(data) {
    const profile = await this.profilesRepository.findById(data.id);

    if (!profile) {
      throw new _AppError.default('não é possível atualizar os dados de um perfil inexistente!');
    }

    const profileWithSameName = await this.profilesRepository.findByName(data.name);

    if (profileWithSameName && profileWithSameName.id !== data.id) {
      throw new _AppError.default('não é possível atualizar um perfil com o mesmo nome de outro!');
    }

    Object.assign(profile, { ...data
    });
    await this.profilesRepository.save(profile);
    await this.cacheProvider.invalidate('profiles');
    return profile;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateProfileService;
exports.default = _default;