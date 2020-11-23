"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IndexGradesService = _interopRequireDefault(require("../../../services/IndexGradesService"));

var _FindGradeByIdService = _interopRequireDefault(require("../../../services/FindGradeByIdService"));

var _CreateGradeService = _interopRequireDefault(require("../../../services/CreateGradeService"));

var _UpdateGradeService = _interopRequireDefault(require("../../../services/UpdateGradeService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GradesController {
  async index(request, response) {
    const indexGrades = _tsyringe.container.resolve(_IndexGradesService.default);

    const grades = await indexGrades.execute();
    return response.json(grades);
  }

  async show(request, response) {
    const {
      grade_id
    } = request.params;

    const findGradeById = _tsyringe.container.resolve(_FindGradeByIdService.default);

    const grade = await findGradeById.execute(grade_id);
    return response.json(grade);
  }

  async create(request, response) {
    const {
      name,
      year,
      value
    } = request.body;

    const createGradeService = _tsyringe.container.resolve(_CreateGradeService.default);

    const grade = await createGradeService.execute({
      name,
      year,
      value
    });
    return response.json(grade);
  }

  async update(request, response) {
    const {
      name,
      year,
      value
    } = request.body;
    const {
      grade_id
    } = request.params;

    const updateGrade = _tsyringe.container.resolve(_UpdateGradeService.default);

    const grade = await updateGrade.execute({
      id: grade_id,
      name,
      year,
      value
    });
    return response.json(grade);
  }

}

exports.default = GradesController;