"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _ProfilesController = _interopRequireDefault(require("../controllers/ProfilesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const profilesController = new _ProfilesController.default();
const profilesRouter = (0, _express.Router)();
profilesRouter.get('/', (req, res, next) => (0, _ensureAuthenticated.default)(['crud_profiles_permiss', 'crud_users_permiss'])(req, res, next), profilesController.index);
profilesRouter.post('/', (req, res, next) => (0, _ensureAuthenticated.default)(['crud_profiles_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    create_extra_debits_permiss: _celebrate.Joi.boolean(),
    create_new_enrollments_permiss: _celebrate.Joi.boolean(),
    crud_extra_debits_permiss: _celebrate.Joi.boolean(),
    crud_grades_permiss: _celebrate.Joi.boolean(),
    crud_profiles_permiss: _celebrate.Joi.boolean(),
    crud_users_permiss: _celebrate.Joi.boolean(),
    discharge_payments_permiss: _celebrate.Joi.boolean(),
    pay_debits_permiss: _celebrate.Joi.boolean(),
    validate_enrollments_permiss: _celebrate.Joi.boolean(),
    generate_documents_permiss: _celebrate.Joi.boolean()
  }
}), profilesController.create);
profilesRouter.put('/:profile_id', (req, res, next) => (0, _ensureAuthenticated.default)(['crud_profiles_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    profile_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    create_extra_debits_permiss: _celebrate.Joi.boolean(),
    create_new_enrollments_permiss: _celebrate.Joi.boolean(),
    crud_extra_debits_permiss: _celebrate.Joi.boolean(),
    crud_grades_permiss: _celebrate.Joi.boolean(),
    crud_profiles_permiss: _celebrate.Joi.boolean(),
    crud_users_permiss: _celebrate.Joi.boolean(),
    discharge_payments_permiss: _celebrate.Joi.boolean(),
    pay_debits_permiss: _celebrate.Joi.boolean(),
    validate_enrollments_permiss: _celebrate.Joi.boolean(),
    generate_documents_permiss: _celebrate.Joi.boolean()
  }
}), profilesController.update);
var _default = profilesRouter;
exports.default = _default;