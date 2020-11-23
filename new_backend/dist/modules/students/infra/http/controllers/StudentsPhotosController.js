"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _UpdateStudentPhotosService = _interopRequireDefault(require("../../../services/UpdateStudentPhotosService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StudentsPhotosController {
  async update(request, response) {
    const files = request.files;
    const {
      student_id
    } = request.params;
    const photos = {};
    files.forEach(file => {
      if (file.fieldname === 'birth_certificate_photo' || file.fieldname === 'vaccine_card_photo' || file.fieldname === 'health_plan_photo' || file.fieldname === 'transfer_declaration_photo' || file.fieldname === 'monthly_declaration_photo' || file.fieldname === 'school_records_photo') {
        photos[file.fieldname] = file.filename;
      }
    });

    const updateStudentPhotos = _tsyringe.container.resolve(_UpdateStudentPhotosService.default);

    const student = await updateStudentPhotos.execute({
      id: student_id,
      birth_certificate_photo: photos.birth_certificate_photo,
      health_plan_photo: photos.health_plan_photo,
      monthly_declaration_photo: photos.monthly_declaration_photo,
      school_records_photo: photos.school_records_photo,
      transfer_declaration_photo: photos.transfer_declaration_photo,
      vaccine_card_photo: photos.vaccine_card_photo
    });
    return response.json((0, _classTransformer.classToClass)(student));
  }

}

exports.default = StudentsPhotosController;