"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeContractsRepository = _interopRequireDefault(require("../repositories/fakes/FakeContractsRepository"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _DisaprooveContractService = _interopRequireDefault(require("./DisaprooveContractService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeContractsRepository;
let fakeMailProvider;
let fakeCacheProvider;
let disaprooveContract;
describe('DisaprooveContract', () => {
  beforeEach(() => {
    fakeContractsRepository = new _FakeContractsRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    disaprooveContract = new _DisaprooveContractService.default(fakeContractsRepository, fakeMailProvider, fakeCacheProvider);
  });
  it('should be able to disaproove contract and send a notify email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      status: 'underAnalysis',
      student_id: 'student'
    });
    const aproovedContract = await disaprooveContract.execute({
      contract_id: contract.id,
      comment: 'disaprooving',
      responsible_contact: {
        name: 'John Doe',
        email: 'johndoe@example.com'
      }
    });
    expect(aproovedContract.status).toBe('pendent');
    expect(sendMail).toBeCalled();
  });
  it('should be able to disaproove contract without sending email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      status: 'underAnalysis',
      student_id: 'student'
    });
    await disaprooveContract.execute({
      contract_id: contract.id,
      comment: 'disaprooving'
    });
    expect(sendMail).toBeCalledTimes(0);
  });
  it('should not be able to aproove a non-existing contract', async () => {
    await expect(disaprooveContract.execute({
      contract_id: 'non-existing-enrollment',
      comment: 'disaprooving',
      responsible_contact: {
        name: 'John Doe',
        email: 'johndoe@example.com'
      }
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to disaproove a contract already aprooved', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student'
    });
    Object.assign(contract, {
      status: 'accepted'
    });
    await fakeContractsRepository.save(contract);
    await expect(disaprooveContract.execute({
      contract_id: contract.id,
      comment: 'trying to disaproove a contract already aprooved'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});