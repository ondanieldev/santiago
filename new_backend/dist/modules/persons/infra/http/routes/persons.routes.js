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

var _PersonsController = _interopRequireDefault(require("../controllers/PersonsController"));

var _PersonPhotosController = _interopRequireDefault(require("../controllers/PersonPhotosController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const personsRouter = (0, _express.Router)();
const upload = (0, _multer.default)(_upload.default.multer);
const personsController = new _PersonsController.default();
const personPhotosController = new _PersonPhotosController.default();
personsRouter.get('/:cpf', (req, res, next) => (0, _ensureAuthenticated.default)(['create_new_enrollments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    cpf: _celebrate.Joi.string().length(11).required()
  }
}), personsController.show);
personsRouter.put('/:person_id', (req, res, next) => (0, _ensureAuthenticated.default)(['validate_enrollments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    person_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    birth_date: _celebrate.Joi.date().required(),
    nacionality: _celebrate.Joi.string().required(),
    civil_state: _celebrate.Joi.string().valid('single', 'married', 'divorced', 'widower', 'separeted').required(),
    profission: _celebrate.Joi.string().required(),
    cpf: _celebrate.Joi.string().length(11).required(),
    rg: _celebrate.Joi.string().required(),
    address_street: _celebrate.Joi.string().required(),
    address_number: _celebrate.Joi.string().required(),
    address_complement: _celebrate.Joi.string(),
    address_neighborhood: _celebrate.Joi.string().required(),
    address_city: _celebrate.Joi.string().required(),
    address_cep: _celebrate.Joi.string().length(8).required(),
    residencial_phone: _celebrate.Joi.string().required(),
    commercial_phone: _celebrate.Joi.string().required(),
    personal_phone: _celebrate.Joi.string().required(),
    education_level: _celebrate.Joi.string().valid('elementary_incompleted', 'elementary_completed', 'highschool_incompleted', 'highschool_completed', 'university_incompleted', 'university_completed').required(),
    workplace: _celebrate.Joi.string().required(),
    monthly_income: _celebrate.Joi.string().valid('a_class', 'b_class', 'c_class', 'd_class', 'e_class').required(),
    income_tax: _celebrate.Joi.boolean(),
    email: _celebrate.Joi.string().email().required(),
    kinship: _celebrate.Joi.string()
  }
}), personsController.update);
personsRouter.patch('/photos/:person_id', (req, res, next) => (0, _ensureAuthenticated.default)(['create_new_enrollments_permiss', 'validate_enrollments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    person_id: _celebrate.Joi.string().uuid().required()
  }
}), upload.any(), personPhotosController.update);
var _default = personsRouter;
exports.default = _default;