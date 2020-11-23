"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersController = new _UsersController.default();
const usersRouter = (0, _express.Router)();
usersRouter.get('/', (req, res, next) => (0, _ensureAuthenticated.default)(['crud_users_permiss'])(req, res, next), usersController.index);
usersRouter.post('/', (req, res, next) => (0, _ensureAuthenticated.default)(['crud_users_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    username: _celebrate.Joi.string().required(),
    password: _celebrate.Joi.string().required(),
    profile_id: _celebrate.Joi.string().uuid().required()
  }
}), usersController.create);
usersRouter.put('/:user_id', (req, res, next) => (0, _ensureAuthenticated.default)(['crud_users_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    user_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    username: _celebrate.Joi.string().required(),
    password: _celebrate.Joi.string().required(),
    profile_id: _celebrate.Joi.string().uuid().required()
  }
}), usersController.update);
var _default = usersRouter;
exports.default = _default;