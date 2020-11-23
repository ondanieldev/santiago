"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Contract = _interopRequireDefault(require("../../infra/typeorm/entities/Contract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeContractsRepository {
  constructor() {
    this.contracts = [];
  }

  async create(data) {
    const contract = new _Contract.default();
    Object.assign(contract, {
      id: (0, _uuid.v4)(),
      status: 'underAnalysis',
      agreements: [],
      grade: {},
      student: {}
    }, data);
    this.contracts.push(contract);
    return contract;
  }

  async findUnderAnalysisAndPendentByGradeId(grade_id) {
    const contracts = this.contracts.filter(findContract => (findContract.status === 'underAnalysis' || findContract.status === 'pendent') && findContract.grade_id === grade_id);
    return contracts;
  }

  async findAcceptedAndActiveByGradeId(grade_id) {
    const contracts = this.contracts.filter(findContract => (findContract.status === 'accepted' || findContract.status === 'active') && findContract.grade_id === grade_id);
    return contracts;
  }

  async findById(id) {
    const contract = this.contracts.find(findContract => findContract.id === id);
    return contract;
  }

  async findByStudentName(student_name, _) {
    const contracts = this.contracts.filter(contract => {
      if (contract.student.name) {
        return contract.student.name.includes(student_name);
      }

      return false;
    });
    return contracts;
  }

  async save(data) {
    const contract = this.contracts.find(findContract => findContract.id === data.id);
    Object.assign(contract, data);
    return data;
  }

  async dangerouslyDelete(id) {
    this.contracts = this.contracts.filter(contract => contract.id !== id);
  }

  async findByGradeId(grade_id) {
    return this.contracts.filter(contract => contract.grade.id === grade_id);
  }

  async findActiveByGradeId(grade_id) {
    return this.contracts.filter(contract => contract.status === 'active' && contract.grade.id === grade_id);
  }

  async findUnderAnalysisAndPendentByStudentName(student_name, grade_id) {
    const contracts = this.contracts.filter(contract => contract.student.name === student_name && contract.grade_id === grade_id && (contract.status === 'underAnalysis' || contract.status === 'pendent'));
    return contracts;
  }

  async findAcceptedAndActiveByStudentName(student_name, grade_id) {
    const contracts = this.contracts.filter(contract => contract.student.name === student_name && contract.grade_id === grade_id && (contract.status === 'accepted' || contract.status === 'active'));
    return contracts;
  }

  async findActiveByStudentName(student_name, grade_id) {
    const contracts = this.contracts.filter(contract => contract.student.name === student_name && contract.grade_id === grade_id && contract.status === 'active');
    return contracts;
  }

}

exports.default = FakeContractsRepository;