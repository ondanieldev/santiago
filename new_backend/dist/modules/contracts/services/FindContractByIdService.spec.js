"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeContractsRepository = _interopRequireDefault(require("../repositories/fakes/FakeContractsRepository"));

var _FindContractByIdService = _interopRequireDefault(require("./FindContractByIdService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeContractsRepository;
let findContractById;
describe('FindContractById', () => {
  beforeEach(() => {
    fakeContractsRepository = new _FakeContractsRepository.default();
    findContractById = new _FindContractByIdService.default(fakeContractsRepository);
  });
  it('should be able to find contract by id', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student'
    });
    const findContract = await findContractById.execute(contract.id);
    expect(findContract.id).toBe(contract.id);
  });
  it('should not be able to find a non-existing contract', async () => {
    await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student'
    });
    expect(findContractById.execute('non-existing-enrollment')).rejects.toBeInstanceOf(_AppError.default);
  });
});