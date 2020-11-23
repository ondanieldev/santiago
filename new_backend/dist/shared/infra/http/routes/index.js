"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _index = _interopRequireDefault(require("../../../../modules/contracts/infra/http/routes/index.routes"));

var _debits = _interopRequireDefault(require("../../../../modules/debits/infra/http/routes/debits.routes"));

var _discharges = _interopRequireDefault(require("../../../../modules/discharges/infra/http/routes/discharges.routes"));

var _enrollments = _interopRequireDefault(require("../../../../modules/enrollments/infra/http/routes/enrollments.routes"));

var _grades = _interopRequireDefault(require("../../../../modules/grades/infra/http/routes/grades.routes"));

var _payments = _interopRequireDefault(require("../../../../modules/payments/infra/http/routes/payments.routes"));

var _persons = _interopRequireDefault(require("../../../../modules/persons/infra/http/routes/persons.routes"));

var _profiles = _interopRequireDefault(require("../../../../modules/profiles/infra/http/routes/profiles.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _students = _interopRequireDefault(require("../../../../modules/students/infra/http/routes/students.routes"));

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/contracts', _index.default);
routes.use('/debits', _debits.default);
routes.use('/discharges', _discharges.default);
routes.use('/enrollments', _enrollments.default);
routes.use('/grades', _grades.default);
routes.use('/payments', _payments.default);
routes.use('/persons', _persons.default);
routes.use('/profiles', _profiles.default);
routes.use('/sessions', _sessions.default);
routes.use('/students', _students.default);
routes.use('/users', _users.default);
var _default = routes;
exports.default = _default;