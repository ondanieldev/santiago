"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _GradesController = _interopRequireDefault(require("../controllers/GradesController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const gradesRouter = (0, _express.Router)();
const gradesController = new _GradesController.default();
gradesRouter.get('/', gradesController.index);
gradesRouter.post('/', (req, res, next) => (0, _ensureAuthenticated.default)(['crud_grades_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    year: _celebrate.Joi.string().required(),
    value: _celebrate.Joi.number().min(0).required()
  }
}), gradesController.create);
gradesRouter.put('/:grade_id', (req, res, next) => (0, _ensureAuthenticated.default)(['crud_grades_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    grade_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    year: _celebrate.Joi.string().required(),
    value: _celebrate.Joi.number().min(0).required()
  }
}), gradesController.update);
gradesRouter.get('/:grade_id', (req, res, next) => (0, _ensureAuthenticated.default)(['crud_grades_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    grade_id: _celebrate.Joi.string().uuid().required()
  }
}), gradesController.show);
var _default = gradesRouter;
exports.default = _default;