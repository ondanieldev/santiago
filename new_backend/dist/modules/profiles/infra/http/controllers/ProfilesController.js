"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IndexProfilesService = _interopRequireDefault(require("../../../services/IndexProfilesService"));

var _CreateProfileService = _interopRequireDefault(require("../../../services/CreateProfileService"));

var _UpdateProfileService = _interopRequireDefault(require("../../../services/UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfilesController {
  async index(request, response) {
    const indexProfiles = _tsyringe.container.resolve(_IndexProfilesService.default);

    const profiles = await indexProfiles.execute();
    return response.json(profiles);
  }

  async create(request, response) {
    const {
      name,
      create_extra_debits_permiss,
      create_new_enrollments_permiss,
      crud_extra_debits_permiss,
      crud_grades_permiss,
      crud_profiles_permiss,
      crud_users_permiss,
      discharge_payments_permiss,
      pay_debits_permiss,
      validate_enrollments_permiss,
      generate_documents_permiss
    } = request.body;

    const createProfile = _tsyringe.container.resolve(_CreateProfileService.default);

    const profile = await createProfile.execute({
      name,
      create_extra_debits_permiss,
      create_new_enrollments_permiss,
      crud_extra_debits_permiss,
      crud_grades_permiss,
      crud_profiles_permiss,
      crud_users_permiss,
      discharge_payments_permiss,
      pay_debits_permiss,
      validate_enrollments_permiss,
      generate_documents_permiss
    });
    return response.json(profile);
  }

  async update(request, response) {
    const {
      name,
      create_extra_debits_permiss,
      create_new_enrollments_permiss,
      crud_extra_debits_permiss,
      crud_grades_permiss,
      crud_profiles_permiss,
      crud_users_permiss,
      discharge_payments_permiss,
      pay_debits_permiss,
      validate_enrollments_permiss,
      generate_documents_permiss
    } = request.body;
    const {
      profile_id
    } = request.params;

    const updateProfile = _tsyringe.container.resolve(_UpdateProfileService.default);

    const profile = await updateProfile.execute({
      id: profile_id,
      name,
      create_extra_debits_permiss,
      create_new_enrollments_permiss,
      crud_extra_debits_permiss,
      crud_grades_permiss,
      crud_profiles_permiss,
      crud_users_permiss,
      discharge_payments_permiss,
      pay_debits_permiss,
      validate_enrollments_permiss,
      generate_documents_permiss
    });
    return response.json(profile);
  }

}

exports.default = ProfilesController;