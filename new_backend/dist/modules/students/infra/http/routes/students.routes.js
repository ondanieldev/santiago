"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _celebrate = require("celebrate");

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _StudentsController = _interopRequireDefault(require("../controllers/StudentsController"));

var _StudentsPhotosController = _interopRequireDefault(require("../controllers/StudentsPhotosController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const studentsRouter = (0, _express.Router)();
const upload = (0, _multer.default)(_upload.default.multer);
const studentsController = new _StudentsController.default();
const studentsPhotosController = new _StudentsPhotosController.default();
studentsRouter.put('/:student_id', (req, res, next) => (0, _ensureAuthenticated.default)(['validate_enrollments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    student_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    birth_city: _celebrate.Joi.string().required(),
    birth_date: _celebrate.Joi.date().required(),
    birth_state: _celebrate.Joi.string().length(2).required(),
    ease_relating: _celebrate.Joi.boolean().required(),
    father_name: _celebrate.Joi.string().required(),
    gender: _celebrate.Joi.string().valid('male', 'female').required(),
    mother_name: _celebrate.Joi.string().required(),
    nacionality: _celebrate.Joi.string().required(),
    name: _celebrate.Joi.string().required(),
    race: _celebrate.Joi.string().valid('white', 'brown', 'black', 'indigenous', 'yellow').required(),
    food_alergy: _celebrate.Joi.string(),
    health_plan: _celebrate.Joi.string(),
    health_problem: _celebrate.Joi.string(),
    medication_alergy: _celebrate.Joi.string(),
    origin_school: _celebrate.Joi.string(),
    special_necessities: _celebrate.Joi.string()
  }
}), studentsController.update);
studentsRouter.patch('/photos/:student_id', (req, res, next) => (0, _ensureAuthenticated.default)(['create_new_enrollments_permiss', 'validate_enrollments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    student_id: _celebrate.Joi.string().uuid().required()
  }
}), upload.any(), studentsPhotosController.update);
var _default = studentsRouter;
exports.default = _default;