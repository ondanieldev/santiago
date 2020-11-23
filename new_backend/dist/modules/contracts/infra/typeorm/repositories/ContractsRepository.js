"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Contract = _interopRequireDefault(require("../entities/Contract"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ContractsRepository = (_dec = (0, _typeorm.EntityRepository)(_Contract.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class ContractsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Contract.default);
  }

  async create(data) {
    const contract = this.ormRepository.create(data);
    await this.ormRepository.save(contract);
    return contract;
  }

  async findUnderAnalysisAndPendentByGradeId(grade_id) {
    const contracts = this.ormRepository.createQueryBuilder('contract').select(['contract.id', 'contract.status']).addSelect('student.name').addSelect(['grade.name', 'grade.year']).leftJoin('contract.student', 'student', 'student.id = contract.student_id').leftJoin('contract.grade', 'grade', 'grade.id = contract.grade_id').where("(contract.status = 'underAnalysis' or contract.status = 'pendent') and contract.grade_id = :grade_id", {
      grade_id
    }).getMany();
    return contracts;
  }

  async findAcceptedAndActiveByGradeId(grade_id) {
    const contracts = this.ormRepository.createQueryBuilder('contract').select(['contract.id', 'contract.status']).addSelect('student.name').addSelect(['grade.name', 'grade.year']).leftJoin('contract.student', 'student', 'student.id = contract.student_id').leftJoin('contract.grade', 'grade', 'grade.id = contract.grade_id').where("(contract.status = 'accepted' or contract.status = 'active') and contract.grade_id = :grade_id", {
      grade_id
    }).getMany();
    return contracts;
  }

  async findById(id) {
    const contract = await this.ormRepository.findOne({
      where: {
        id
      },
      relations: ['student', 'grade', 'agreements', 'agreements.person']
    });
    return contract;
  }

  async save(contract) {
    await this.ormRepository.save(contract);
    return contract;
  }

  async dangerouslyDelete(id) {
    await this.ormRepository.createQueryBuilder().delete().where('id = :id', {
      id
    }).execute();
  }

  async findByGradeId(grade_id) {
    const contracts = await this.ormRepository.find({
      where: {
        grade: {
          id: grade_id
        }
      }
    });
    return contracts;
  }

  async findActiveByGradeId(grade_id) {
    const contracts = this.ormRepository.createQueryBuilder('contract').select(['contract.id', 'contract.status']).addSelect('student.name').addSelect(['grade.name', 'grade.year']).leftJoin('contract.student', 'student', 'student.id = contract.student_id').leftJoin('contract.grade', 'grade', 'grade.id = contract.grade_id').where("contract.status = 'active' and grade.id = :grade_id", {
      grade_id
    }).getMany();
    return contracts;
  }

  async findUnderAnalysisAndPendentByStudentName(student_name, grade_id) {
    const contracts = await this.ormRepository.createQueryBuilder('contract').select(['contract.id', 'contract.status']).addSelect('student.name').addSelect(['grade.name', 'grade.year']).leftJoin('contract.student', 'student', 'student.id = contract.student_id').leftJoin('contract.grade', 'grade', 'grade.id = contract.grade_id').where("(contract.status = 'underAnalysis' or contract.status = 'pendent') and lower(student.name) like :student_name and contract.grade_id = :grade_id", {
      student_name: `%${student_name}%`,
      grade_id
    }).getMany();
    return contracts;
  }

  async findAcceptedAndActiveByStudentName(student_name, grade_id) {
    const contracts = await this.ormRepository.createQueryBuilder('contract').select(['contract.id', 'contract.status']).addSelect('student.name').addSelect(['grade.name', 'grade.year']).leftJoin('contract.student', 'student', 'student.id = contract.student_id').leftJoin('contract.grade', 'grade', 'grade.id = contract.grade_id').where("(contract.status = 'accepted' or contract.status = 'active') and lower(student.name) like :student_name and contract.grade_id = :grade_id", {
      student_name: `%${student_name}%`,
      grade_id
    }).getMany();
    return contracts;
  }

  async findActiveByStudentName(student_name, grade_id) {
    const contracts = await this.ormRepository.createQueryBuilder('contract').select(['contract.id', 'contract.status']).addSelect('student.name').addSelect(['grade.name', 'grade.year']).leftJoin('contract.student', 'student', 'student.id = contract.student_id').leftJoin('contract.grade', 'grade', 'grade.id = contract.grade_id').where("contract.status = 'active' and lower(student.name) like :student_name and contract.grade_id = :grade_id", {
      student_name: `%${student_name}%`,
      grade_id
    }).getMany();
    return contracts;
  }

}, _temp)) || _class) || _class) || _class);
exports.default = ContractsRepository;