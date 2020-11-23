"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _FindPersonByCpfService = _interopRequireDefault(require("../../../services/FindPersonByCpfService"));

var _CreatePersonService = _interopRequireDefault(require("../../../services/CreatePersonService"));

var _UpdatePersonService = _interopRequireDefault(require("../../../services/UpdatePersonService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PersonsController {
  async show(request, response, _) {
    const {
      cpf
    } = request.params;

    const findPersonByCpf = _tsyringe.container.resolve(_FindPersonByCpfService.default);

    const person = await findPersonByCpf.execute(cpf);
    return response.json((0, _classTransformer.classToClass)(person));
  }

  async create(request, response, _) {
    const {
      name,
      birth_date,
      nacionality,
      civil_state,
      profission,
      cpf,
      rg,
      address_street,
      address_number,
      address_complement,
      address_neighborhood,
      address_city,
      address_cep,
      residencial_phone,
      commercial_phone,
      personal_phone,
      education_level,
      workplace,
      monthly_income,
      income_tax,
      email
    } = request.body;

    const createPerson = _tsyringe.container.resolve(_CreatePersonService.default);

    const person = await createPerson.execute({
      name,
      birth_date,
      nacionality,
      civil_state,
      profission,
      cpf,
      rg,
      address_street,
      address_number,
      address_complement,
      address_neighborhood,
      address_city,
      address_cep,
      residencial_phone,
      commercial_phone,
      personal_phone,
      education_level,
      workplace,
      monthly_income,
      income_tax,
      email
    });
    return response.json((0, _classTransformer.classToClass)(person));
  }

  async update(request, response, _) {
    const {
      person_id
    } = request.params;
    const {
      name,
      birth_date,
      nacionality,
      civil_state,
      profission,
      cpf,
      rg,
      address_street,
      address_number,
      address_complement,
      address_neighborhood,
      address_city,
      address_cep,
      residencial_phone,
      commercial_phone,
      personal_phone,
      education_level,
      workplace,
      monthly_income,
      income_tax,
      email
    } = request.body;

    const updatePerson = _tsyringe.container.resolve(_UpdatePersonService.default);

    const person = await updatePerson.execute({
      id: person_id,
      name,
      birth_date,
      nacionality,
      civil_state,
      profission,
      cpf,
      rg,
      address_street,
      address_number,
      address_complement,
      address_neighborhood,
      address_city,
      address_cep,
      residencial_phone,
      commercial_phone,
      personal_phone,
      education_level,
      workplace,
      monthly_income,
      income_tax,
      email
    });
    return response.json((0, _classTransformer.classToClass)(person));
  }

}

exports.default = PersonsController;