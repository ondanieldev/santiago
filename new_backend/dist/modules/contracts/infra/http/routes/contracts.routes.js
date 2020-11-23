"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _ContractsController = _interopRequireDefault(require("../controllers/ContractsController"));

var _ContractsGradeController = _interopRequireDefault(require("../controllers/ContractsGradeController"));

var _AproovedContractsController = _interopRequireDefault(require("../controllers/AproovedContractsController"));

var _DisaproovedContractsController = _interopRequireDefault(require("../controllers/DisaproovedContractsController"));

var _GradesAcceptedAndActiveContractsController = _interopRequireDefault(require("../controllers/GradesAcceptedAndActiveContractsController"));

var _GradesUnderAnalysisAndPendentContractsController = _interopRequireDefault(require("../controllers/GradesUnderAnalysisAndPendentContractsController"));

var _GradesActiveContractsController = _interopRequireDefault(require("../controllers/GradesActiveContractsController"));

var _StudentsUnderAnalysisAndPendentContractsController = _interopRequireDefault(require("../controllers/StudentsUnderAnalysisAndPendentContractsController"));

var _StudentsAcceptedAndActiveContractsControler = _interopRequireDefault(require("../controllers/StudentsAcceptedAndActiveContractsControler"));

var _StudentsActiveContractsController = _interopRequireDefault(require("../controllers/StudentsActiveContractsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const contractsRouter = (0, _express.Router)();
const contractsController = new _ContractsController.default();
const contractsGradeController = new _ContractsGradeController.default();
const aproovedContractsController = new _AproovedContractsController.default();
const disaproovedContractsController = new _DisaproovedContractsController.default();
const gradesUnderAnalysisAndPendentContractsController = new _GradesUnderAnalysisAndPendentContractsController.default();
const gradesAcceptedAndActiveContractsController = new _GradesAcceptedAndActiveContractsController.default();
const gradesActiveContractsController = new _GradesActiveContractsController.default();
const studentsUnderAnalysisAndPendentContractsController = new _StudentsUnderAnalysisAndPendentContractsController.default();
const studentsAcceptedAndActiveContractsControler = new _StudentsAcceptedAndActiveContractsControler.default();
const studentsActiveContractsController = new _StudentsActiveContractsController.default();
contractsRouter.get('/under-analysis-pendent/grades/:grade_id', (req, res, next) => (0, _ensureAuthenticated.default)(['validate_enrollments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    grade_id: _celebrate.Joi.string().uuid().required()
  }
}), gradesUnderAnalysisAndPendentContractsController.index);
contractsRouter.get('/accepted-active/grades/:grade_id', (req, res, next) => (0, _ensureAuthenticated.default)(['pay_debits_permiss', 'discharge_payments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    grade_id: _celebrate.Joi.string().uuid().required()
  }
}), gradesAcceptedAndActiveContractsController.index);
contractsRouter.get('/active/grades/:grade_id', (req, res, next) => (0, _ensureAuthenticated.default)(['create_extra_debits_permiss', 'crud_extra_debits_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    grade_id: _celebrate.Joi.string().uuid().required()
  }
}), gradesActiveContractsController.index);
contractsRouter.get('/under-analysis-pendent/students/:grade_id', (req, res, next) => (0, _ensureAuthenticated.default)(['validate_enrollments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    student_name: _celebrate.Joi.string().required()
  },
  [_celebrate.Segments.PARAMS]: {
    grade_id: _celebrate.Joi.string().uuid().required()
  }
}), studentsUnderAnalysisAndPendentContractsController.index);
contractsRouter.get('/accepted-active/students/:grade_id', (req, res, next) => (0, _ensureAuthenticated.default)(['validate_enrollments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    student_name: _celebrate.Joi.string().required()
  },
  [_celebrate.Segments.PARAMS]: {
    grade_id: _celebrate.Joi.string().uuid().required()
  }
}), studentsAcceptedAndActiveContractsControler.index);
contractsRouter.get('/active/students/:grade_id', (req, res, next) => (0, _ensureAuthenticated.default)(['validate_enrollments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.QUERY]: {
    student_name: _celebrate.Joi.string().required()
  },
  [_celebrate.Segments.PARAMS]: {
    grade_id: _celebrate.Joi.string().uuid().required()
  }
}), studentsActiveContractsController.index);
contractsRouter.get('/:contract_id', (req, res, next) => (0, _ensureAuthenticated.default)(['validate_enrollments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    contract_id: _celebrate.Joi.string().uuid().required()
  }
}), contractsController.show);
contractsRouter.patch('/:contract_id/grade', (req, res, next) => (0, _ensureAuthenticated.default)(['validate_enrollments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    contract_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    grade_id: _celebrate.Joi.string().uuid().required()
  }
}), contractsGradeController.update);
contractsRouter.patch('/:contract_id/aproove', (req, res, next) => (0, _ensureAuthenticated.default)(['validate_enrollments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    contract_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    responsible_email: _celebrate.Joi.string().email(),
    responsible_name: _celebrate.Joi.string(),
    discount: _celebrate.Joi.number().min(0).optional().allow('').default(0),
    comment: _celebrate.Joi.string().optional().allow('')
  }
}), aproovedContractsController.update);
contractsRouter.patch('/:contract_id/disaproove', (req, res, next) => (0, _ensureAuthenticated.default)(['validate_enrollments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    contract_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    responsible_email: _celebrate.Joi.string().email(),
    responsible_name: _celebrate.Joi.string(),
    comment: _celebrate.Joi.string().optional().allow('')
  }
}), disaproovedContractsController.update);
var _default = contractsRouter;
exports.default = _default;