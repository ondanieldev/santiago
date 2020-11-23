"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPersonsRepository = _interopRequireDefault(require("../repositories/IPersonsRepository"));

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdatePersonPhotosService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PersonsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPersonsRepository.default === "undefined" ? Object : _IPersonsRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdatePersonPhotosService {
  constructor(personsRepository, storageProvider) {
    this.personsRepository = personsRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    person_id,
    rg_photo,
    cpf_photo,
    residencial_proof_photo
  }) {
    const person = await this.personsRepository.findById(person_id);

    if (!person) {
      throw new _AppError.default('não é possível atualizar as fotos de uma pessoa inexistente!');
    }

    const photos = [];
    if (rg_photo) photos.push({
      field: 'rg_photo',
      filename: rg_photo
    });
    if (cpf_photo) photos.push({
      field: 'cpf_photo',
      filename: cpf_photo
    });
    if (residencial_proof_photo) photos.push({
      field: 'residencial_proof_photo',
      filename: residencial_proof_photo
    });

    for (const photo of photos) {
      await this.storageProvider.saveFile(photo.filename);

      if (person[photo.field]) {
        await this.storageProvider.deleteFile(person[photo.field]);
      }

      person[photo.field] = photo.filename;
    }

    await this.personsRepository.save(person);
    return person;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdatePersonPhotosService;