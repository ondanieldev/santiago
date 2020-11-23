"use strict";

var _tsyringe = require("tsyringe");

require("./providers");

var _AgreementsRepository = _interopRequireDefault(require("../../modules/agreements/infra/typeorm/repositories/AgreementsRepository"));

var _ContractsRepository = _interopRequireDefault(require("../../modules/contracts/infra/typeorm/repositories/ContractsRepository"));

var _DebitsRepository = _interopRequireDefault(require("../../modules/debits/infra/typeorm/repositories/DebitsRepository"));

var _DischargesRepository = _interopRequireDefault(require("../../modules/discharges/infra/typeorm/repositories/DischargesRepository"));

var _GradesRepository = _interopRequireDefault(require("../../modules/grades/infra/typeorm/repositories/GradesRepository"));

var _PaymentsRepository = _interopRequireDefault(require("../../modules/payments/infra/typeorm/repositories/PaymentsRepository"));

var _PersonsRepository = _interopRequireDefault(require("../../modules/persons/infra/typeorm/repositories/PersonsRepository"));

var _ProfilesRepository = _interopRequireDefault(require("../../modules/profiles/infra/typeorm/repositories/ProfilesRepository"));

var _RelationshipsRepository = _interopRequireDefault(require("../../modules/relationships/infra/typeorm/repositories/RelationshipsRepository"));

var _StudentsRepository = _interopRequireDefault(require("../../modules/students/infra/typeorm/repositories/StudentsRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('AgreementsRepository', _AgreementsRepository.default);

_tsyringe.container.registerSingleton('ContractsRepository', _ContractsRepository.default);

_tsyringe.container.registerSingleton('DebitsRepository', _DebitsRepository.default);

_tsyringe.container.registerSingleton('DischargesRepository', _DischargesRepository.default);

_tsyringe.container.registerSingleton('GradesRepository', _GradesRepository.default);

_tsyringe.container.registerSingleton('PaymentsRepository', _PaymentsRepository.default);

_tsyringe.container.registerSingleton('PersonsRepository', _PersonsRepository.default);

_tsyringe.container.registerSingleton('ProfilesRepository', _ProfilesRepository.default);

_tsyringe.container.registerSingleton('RelationshipsRepository', _RelationshipsRepository.default);

_tsyringe.container.registerSingleton('StudentsRepository', _StudentsRepository.default);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);