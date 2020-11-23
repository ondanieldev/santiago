"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateStudentService = _interopRequireDefault(require("../../../services/CreateStudentService"));

var _UpdateStudentService = _interopRequireDefault(require("../../../services/UpdateStudentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StudentsController {
  async create(request, response) {
    const {
      birth_city,
      birth_date,
      birth_state,
      ease_relating,
      father_name,
      gender,
      mother_name,
      nacionality,
      name,
      race,
      food_alergy,
      health_plan,
      health_problem,
      medication_alergy,
      origin_school,
      special_necessities
    } = request.body;

    const createStudent = _tsyringe.container.resolve(_CreateStudentService.default);

    const student = await createStudent.execute({
      birth_city,
      birth_date,
      birth_state,
      ease_relating,
      father_name,
      gender,
      mother_name,
      nacionality,
      name,
      race,
      food_alergy,
      health_plan,
      health_problem,
      medication_alergy,
      origin_school,
      special_necessities
    });
    return response.json((0, _classTransformer.classToClass)(student));
  }

  async update(request, response) {
    const {
      student_id
    } = request.params;
    const {
      birth_city,
      birth_date,
      birth_state,
      ease_relating,
      father_name,
      gender,
      mother_name,
      nacionality,
      name,
      race,
      food_alergy,
      health_plan,
      health_problem,
      medication_alergy,
      origin_school,
      special_necessities
    } = request.body;

    const updateStudent = _tsyringe.container.resolve(_UpdateStudentService.default);

    const student = await updateStudent.execute({
      id: student_id,
      birth_city,
      birth_date,
      birth_state,
      ease_relating,
      father_name,
      gender,
      mother_name,
      nacionality,
      name,
      race,
      food_alergy,
      health_plan,
      health_problem,
      medication_alergy,
      origin_school,
      special_necessities
    });
    return response.json((0, _classTransformer.classToClass)(student));
  }

}

exports.default = StudentsController;