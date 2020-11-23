"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateStudentService = _interopRequireDefault(require("../../students/services/CreateStudentService"));

var _CreateContractService = _interopRequireDefault(require("../../contracts/services/CreateContractService"));

var _CreatePersonService = _interopRequireDefault(require("../../persons/services/CreatePersonService"));

var _CreateAgreementService = _interopRequireDefault(require("../../agreements/services/CreateAgreementService"));

var _CreateRelationshipService = _interopRequireDefault(require("../../relationships/services/CreateRelationshipService"));

var _IStudentsRepository = _interopRequireDefault(require("../../students/repositories/IStudentsRepository"));

var _IPersonsRepository = _interopRequireDefault(require("../../persons/repositories/IPersonsRepository"));

var _IContractsRepository = _interopRequireDefault(require("../../contracts/repositories/IContractsRepository"));

var _IAgreementsRepository = _interopRequireDefault(require("../../agreements/repositories/IAgreementsRepository"));

var _IRelationshipsRepository = _interopRequireDefault(require("../../relationships/repositories/IRelationshipsRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateEnrollmentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('StudentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('PersonsRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('AgreementsRepository')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('RelationshipsRepository')(target, undefined, 4);
}, _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [typeof _IStudentsRepository.default === "undefined" ? Object : _IStudentsRepository.default, typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default, typeof _IPersonsRepository.default === "undefined" ? Object : _IPersonsRepository.default, typeof _IAgreementsRepository.default === "undefined" ? Object : _IAgreementsRepository.default, typeof _IRelationshipsRepository.default === "undefined" ? Object : _IRelationshipsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = class CreateEnrollmentService {
  constructor(studentRepository, contractsRepository, personsRepository, agreementsRepository, relationshipsRepository) {
    this.studentRepository = studentRepository;
    this.contractsRepository = contractsRepository;
    this.personsRepository = personsRepository;
    this.agreementsRepository = agreementsRepository;
    this.relationshipsRepository = relationshipsRepository;
  }

  async execute({
    grade,
    student,
    financial_responsible,
    financial_responsible_id,
    supportive_responsible,
    supportive_responsible_id
  }) {
    const inserts = [];

    if (financial_responsible.cpf && supportive_responsible.cpf && (financial_responsible.cpf === supportive_responsible.cpf || financial_responsible.rg === supportive_responsible.rg || financial_responsible.email === supportive_responsible.email)) {
      throw new _AppError.default('CPF, RG e e-mail dos responsáveis não podem ser iguais!');
    }

    try {
      const createStudent = _tsyringe.container.resolve(_CreateStudentService.default);

      const createContract = _tsyringe.container.resolve(_CreateContractService.default);

      const createPerson = _tsyringe.container.resolve(_CreatePersonService.default);

      const createAgreement = _tsyringe.container.resolve(_CreateAgreementService.default);

      const createRelationship = _tsyringe.container.resolve(_CreateRelationshipService.default);

      const createdStudent = await createStudent.execute(student);
      inserts.push({
        resource: 'student',
        id: createdStudent.id
      });
      const createdContract = await createContract.execute({
        grade_id: grade.id,
        student_id: createdStudent.id
      });
      inserts.push({
        resource: 'contract',
        id: createdContract.id
      });
      let financialId = financial_responsible_id;

      if (!financialId) {
        const createdFinancial = await createPerson.execute(financial_responsible);
        financialId = createdFinancial.id;
        inserts.push({
          resource: 'person',
          id: createdFinancial.id
        });
      }

      const createdFinancialAgreement = await createAgreement.execute({
        contract_id: createdContract.id,
        person_id: financialId,
        responsible_type: 'financial'
      });
      inserts.push({
        resource: 'agreement',
        id: createdFinancialAgreement.id
      });
      const createdFinancialRelationship = await createRelationship.execute({
        person_id: financialId,
        student_id: createdStudent.id,
        kinship: financial_responsible.kinship
      });
      inserts.push({
        resource: 'relationship',
        id: createdFinancialRelationship.id
      });
      let supportiveId = supportive_responsible_id;

      if (!supportiveId) {
        const createdSupportive = await createPerson.execute(supportive_responsible);
        supportiveId = createdSupportive.id;
        inserts.push({
          resource: 'person',
          id: createdSupportive.id
        });
      }

      const createdSupportiveAgreement = await createAgreement.execute({
        contract_id: createdContract.id,
        person_id: supportiveId,
        responsible_type: 'supportive'
      });
      inserts.push({
        resource: 'person',
        id: createdSupportiveAgreement.id
      });
      const createdSupportiveRelationship = await createRelationship.execute({
        person_id: supportiveId,
        student_id: createdStudent.id,
        kinship: supportive_responsible.kinship
      });
      inserts.push({
        resource: 'relationship',
        id: createdSupportiveRelationship.id
      });
      return {
        student_id: createdStudent.id,
        financial_id: financialId,
        supportive_id: supportiveId
      };
    } catch (err) {
      for (const {
        id,
        resource
      } of inserts) {
        switch (resource) {
          case 'student':
            await this.studentRepository.dangerouslyDelete(id);
            break;

          case 'contract':
            await this.contractsRepository.dangerouslyDelete(id);
            break;

          case 'person':
            await this.personsRepository.dangerouslyDelete(id);
            break;

          case 'agreement':
            await this.agreementsRepository.dangerouslyDelete(id);
            break;

          case 'relationship':
            await this.relationshipsRepository.dangerouslyDelete(id);
            break;

          default:
            break;
        }
      }

      throw err;
    }
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateEnrollmentService;