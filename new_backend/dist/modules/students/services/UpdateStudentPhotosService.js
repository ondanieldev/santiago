"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IStudentsRepository = _interopRequireDefault(require("../repositories/IStudentsRepository"));

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateStudentPhotosService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('StudentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IStudentsRepository.default === "undefined" ? Object : _IStudentsRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateStudentPhotosService {
  constructor(studentsRepository, storageProvider) {
    this.studentsRepository = studentsRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    id,
    birth_certificate_photo,
    health_plan_photo,
    monthly_declaration_photo,
    school_records_photo,
    transfer_declaration_photo,
    vaccine_card_photo
  }) {
    const student = await this.studentsRepository.findById(id);

    if (!student) {
      throw new _AppError.default('não é possível atualizar as fotos de um aluno inexistente!');
    }

    const photos = [];
    if (birth_certificate_photo) photos.push({
      field: 'birth_certificate_photo',
      filename: birth_certificate_photo
    });
    if (health_plan_photo) photos.push({
      field: 'health_plan_photo',
      filename: health_plan_photo
    });
    if (monthly_declaration_photo) photos.push({
      field: 'monthly_declaration_photo',
      filename: monthly_declaration_photo
    });
    if (school_records_photo) photos.push({
      field: 'school_records_photo',
      filename: school_records_photo
    });
    if (transfer_declaration_photo) photos.push({
      field: 'transfer_declaration_photo',
      filename: transfer_declaration_photo
    });
    if (vaccine_card_photo) photos.push({
      field: 'vaccine_card_photo',
      filename: vaccine_card_photo
    });

    for (const photo of photos) {
      await this.storageProvider.saveFile(photo.filename);

      if (student[photo.field]) {
        await this.storageProvider.deleteFile(student[photo.field]);
      }

      student[photo.field] = photo.filename;
    }

    await this.studentsRepository.save(student);
    return student;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateStudentPhotosService;