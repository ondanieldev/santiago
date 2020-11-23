"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeContractsRepository = _interopRequireDefault(require("../repositories/fakes/FakeContractsRepository"));

var _FakeDebitsRepository = _interopRequireDefault(require("../../debits/repositories/fakes/FakeDebitsRepository"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _AprooveContractService = _interopRequireDefault(require("./AprooveContractService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeContractsRepository;
let fakeDebitsRepository;
let fakeMailProvider;
let fakeCacheProvider;
let aprooveContract;
describe('AprooveContract', () => {
  beforeEach(() => {
    fakeContractsRepository = new _FakeContractsRepository.default();
    fakeDebitsRepository = new _FakeDebitsRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    aprooveContract = new _AprooveContractService.default(fakeContractsRepository, fakeDebitsRepository, fakeMailProvider, fakeCacheProvider);
  });
  it('should be able to aproove contract, generate debit and send a notify email', async () => {
    const createDebit = jest.spyOn(fakeDebitsRepository, 'create');
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student'
    });
    const aproovedContract = await aprooveContract.execute({
      contract_id: contract.id,
      comment: 'aprooving',
      responsible_contact: {
        name: 'John Doe',
        email: 'johndoe@example.com'
      }
    });
    expect(aproovedContract.status).toBe('accepted');
    expect(createDebit).toBeCalled();
    expect(sendMail).toBeCalled();
  });
  it('should be able to aproove contract, generate debit and do not send email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student'
    });
    await aprooveContract.execute({
      contract_id: contract.id,
      comment: 'aprooving'
    });
    expect(sendMail).toBeCalledTimes(0);
  });
  it('should not be able to aproove a non-existing contract', async () => {
    await expect(aprooveContract.execute({
      contract_id: 'non-existing-enrollment',
      comment: 'aprooving',
      responsible_contact: {
        name: 'John Doe',
        email: 'johndoe@example.com'
      }
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to aproove a contract already aprooved', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student'
    });
    await aprooveContract.execute({
      contract_id: contract.id,
      comment: 'aprooving'
    });
    await expect(aprooveContract.execute({
      contract_id: contract.id,
      comment: 'trying to aproov again'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});