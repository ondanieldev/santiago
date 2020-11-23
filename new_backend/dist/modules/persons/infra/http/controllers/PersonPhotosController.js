"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _UpdatePersonPhotosService = _interopRequireDefault(require("../../../services/UpdatePersonPhotosService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PersonPhotosController {
  async update(request, response, _) {
    const files = request.files;
    const {
      person_id
    } = request.params;
    const photos = {};
    files.forEach(file => {
      if (file.fieldname === 'rg_photo' || file.fieldname === 'cpf_photo' || file.fieldname === 'residencial_proof_photo') {
        photos[file.fieldname] = file.filename;
      }
    });

    const updatePersonPhotos = _tsyringe.container.resolve(_UpdatePersonPhotosService.default);

    const person = await updatePersonPhotos.execute({
      person_id,
      rg_photo: photos.rg_photo,
      cpf_photo: photos.cpf_photo,
      residencial_proof_photo: photos.residencial_proof_photo
    });
    return response.json((0, _classTransformer.classToClass)(person));
  }

}

exports.default = PersonPhotosController;