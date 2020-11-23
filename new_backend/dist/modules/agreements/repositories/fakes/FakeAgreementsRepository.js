"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Agreement = _interopRequireDefault(require("../../infra/typeorm/entities/Agreement"));

var _FakeContractsRepository = _interopRequireDefault(require("../../../contracts/repositories/fakes/FakeContractsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.agreements = [];
  }

  async findById(id) {
    const agreement = this.agreements.find(findAgreement => findAgreement.id === id);
    return agreement;
  }

  async create(data) {
    const agreement = new _Agreement.default();
    Object.assign(agreement, {
      id: (0, _uuid.v4)()
    }, data, {
      person: {}
    });
    this.agreements.push(agreement);
    const fakeContractsRepository = new _FakeContractsRepository.default();
    const contract = await fakeContractsRepository.findById(data.contract_id);

    if (contract) {
      Object.assign(contract, agreement);
      await fakeContractsRepository.save(contract);
    }

    return agreement;
  }

  async dangerouslyDelete(id) {
    this.agreements.filter(agreement => agreement.id !== id);
  }

}

exports.default = UsersRepository;