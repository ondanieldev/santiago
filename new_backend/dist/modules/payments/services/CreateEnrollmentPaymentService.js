"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _uuid = require("uuid");

var _dateFns = require("date-fns");

var _axios = _interopRequireDefault(require("axios"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _IDebitsRepository = _interopRequireDefault(require("../../debits/repositories/IDebitsRepository"));

var _IPaymentsRepository = _interopRequireDefault(require("../repositories/IPaymentsRepository"));

var _IReceiptProvider = _interopRequireDefault(require("../../../shared/container/providers/ReceiptProvider/models/IReceiptProvider"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IContractsRepository = _interopRequireDefault(require("../../contracts/repositories/IContractsRepository"));

var _IPersonsRepository = _interopRequireDefault(require("../../persons/repositories/IPersonsRepository"));

var _IStudentsRepository = _interopRequireDefault(require("../../students/repositories/IStudentsRepository"));

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _IProfilesRepository = _interopRequireDefault(require("../../profiles/repositories/IProfilesRepository"));

var _IHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/models/IHashProvider"));

var _IGradesRepository = _interopRequireDefault(require("../../grades/repositories/IGradesRepository"));

var _recursiveReturnNextBusinessDay = _interopRequireDefault(require("../../../shared/utils/recursiveReturnNextBusinessDay"));

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _formatFunctions = require("../../../shared/utils/formatFunctions");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePaymentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('DebitsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PaymentsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('StudentsRepository')(target, undefined, 4);
}, _dec7 = function (target, key) {
  return (0, _tsyringe.inject)('PersonsRepository')(target, undefined, 5);
}, _dec8 = function (target, key) {
  return (0, _tsyringe.inject)('ProfilesRepository')(target, undefined, 6);
}, _dec9 = function (target, key) {
  return (0, _tsyringe.inject)('GradesRepository')(target, undefined, 7);
}, _dec10 = function (target, key) {
  return (0, _tsyringe.inject)('ReceiptProvider')(target, undefined, 8);
}, _dec11 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 9);
}, _dec12 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 10);
}, _dec13 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 11);
}, _dec14 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 12);
}, _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [typeof _IDebitsRepository.default === "undefined" ? Object : _IDebitsRepository.default, typeof _IPaymentsRepository.default === "undefined" ? Object : _IPaymentsRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default, typeof _IStudentsRepository.default === "undefined" ? Object : _IStudentsRepository.default, typeof _IPersonsRepository.default === "undefined" ? Object : _IPersonsRepository.default, typeof _IProfilesRepository.default === "undefined" ? Object : _IProfilesRepository.default, typeof _IGradesRepository.default === "undefined" ? Object : _IGradesRepository.default, typeof _IReceiptProvider.default === "undefined" ? Object : _IReceiptProvider.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default, typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = _dec10(_class = _dec11(_class = _dec12(_class = _dec13(_class = _dec14(_class = _dec15(_class = _dec16(_class = class CreatePaymentService {
  constructor(debitsRepository, paymentsRepository, usersRepository, contractsRepository, studentsRepository, personsRepository, profilesRepository, gradesRepository, receiptProvider, storageProvider, cacheProvider, mailProvider, hashProvider) {
    this.debitsRepository = debitsRepository;
    this.paymentsRepository = paymentsRepository;
    this.usersRepository = usersRepository;
    this.contractsRepository = contractsRepository;
    this.studentsRepository = studentsRepository;
    this.personsRepository = personsRepository;
    this.profilesRepository = profilesRepository;
    this.gradesRepository = gradesRepository;
    this.receiptProvider = receiptProvider;
    this.storageProvider = storageProvider;
    this.cacheProvider = cacheProvider;
    this.mailProvider = mailProvider;
    this.hashProvider = hashProvider;
  }

  async execute({
    method,
    debit_id,
    user_id
  }) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('não é possível pagar uma matrícula sem estar logado no sistema!');
    }

    const debit = await this.debitsRepository.findById(debit_id);

    if (!debit) {
      throw new _AppError.default('não é possível pagar uma matrícula que não existe!');
    }

    if (debit.paid) {
      throw new _AppError.default('não é possível pagar uma matrícula que já foi paga!');
    }

    if (debit.type !== 'enrollment') {
      throw new _AppError.default('não é possível pagar um débito que não é do tipo matrícula a partir deste serviço!');
    }

    const contract = await this.contractsRepository.findById(debit.contract_id);

    if (!contract) {
      throw new _AppError.default('não é possível pagar um débito de um contrato inexistente!');
    }

    const grade = await this.gradesRepository.findById(contract.grade_id);

    if (!grade) {
      throw new _AppError.default('não é possível pagar um débito de uma turma inexistente!');
    }

    const receipt = await this.receiptProvider.generate({
      client: {
        name: contract.agreements[0].person.name,
        cpf: contract.agreements[0].person.cpf
      },
      operative: {
        name: user.username
      },
      items: [{
        description: debit.description,
        base_value: Number(debit.value),
        true_value: Number(debit.value),
        quantity: 1,
        variation: 0
      }],
      method
    });
    await this.storageProvider.saveFile(receipt);
    const payment = await this.paymentsRepository.create({
      amount: debit.value,
      debit_id,
      method,
      user_id,
      receipt
    });
    Object.assign(debit, {
      paid: true,
      payday: new Date()
    });
    await this.debitsRepository.save(debit);
    Object.assign(contract, {
      status: 'active'
    });
    await this.contractsRepository.save(contract);
    let studentProfile = await this.profilesRepository.findByName('Aluno');

    if (!studentProfile) {
      studentProfile = await this.profilesRepository.create({
        name: 'Aluno'
      });
      this.cacheProvider.invalidate('profiles');
    }

    const studentPassword = (0, _uuid.v4)().slice(0, 6);
    const studentUser = await this.usersRepository.create({
      username: (0, _uuid.v4)(),
      password: await this.hashProvider.generateHash(studentPassword),
      profile_id: studentProfile.id
    });
    const {
      student
    } = contract;
    await this.studentsRepository.updateUser(student.id, studentUser.id);
    let responsibleProfile = await this.profilesRepository.findByName('Responsável');

    if (!responsibleProfile) {
      responsibleProfile = await this.profilesRepository.create({
        name: 'Responsável'
      });
      this.cacheProvider.invalidate('profiles');
    }

    for (const agreement of contract.agreements) {
      const {
        person
      } = agreement;
      let responsibleUsername = 'usuário já utilizado no sistema.';
      let responsiblePassword = 'senha já utilizada no sistema.';

      if (!person.user_id) {
        responsibleUsername = (0, _uuid.v4)();
        responsiblePassword = (0, _uuid.v4)().slice(0, 6);
        const responsibleUser = await this.usersRepository.create({
          username: responsibleUsername,
          password: await this.hashProvider.generateHash(responsiblePassword),
          profile_id: responsibleProfile.id
        });
        await this.personsRepository.updateUser(person.id, responsibleUser.id);
      }

      const studentArticleWithNoun = student.gender === 'male' ? 'do aluno' : 'da aluna';
      const studentArticle = student.gender === 'male' ? 'do' : 'da';
      this.mailProvider.sendMail({
        to: {
          name: person.name,
          email: person.email
        },
        subject: '[Santiago] Matrícula Efetivada',
        body: {
          file: 'notify_active_enrollment.hbs',
          variables: {
            responsibleName: (0, _formatFunctions.capitalize)(person.name),
            responsibleUsername,
            responsiblePassword,
            studentName: (0, _formatFunctions.capitalize)(student.name),
            studentUsername: studentUser.username,
            studentPassword,
            studentArticleWithNoun,
            studentArticle
          }
        }
      });
    }

    const actualYear = (0, _dateFns.getYear)(new Date());
    let holidays = [];

    try {
      const response = await _axios.default.get(`https://api.calendario.com.br/?json=true&ano=${actualYear}&estado=MG&cidade=BETIM&token=b2ZpY2lhbC5kYW5pZWxvbGl2ZWlyYUBnbWFpbC5jb20maGFzaD0xMzgxMjA4NDA`);
      holidays = response.data;
    } catch {}

    for (let i = 1; i < 12; ++i) {
      const payment_limit_date = await (0, _recursiveReturnNextBusinessDay.default)(new Date(actualYear, i, 10, 0, 0, 0), holidays);
      await this.debitsRepository.create({
        contract_id: contract.id,
        description: `${i + 1}ª parcela`,
        payment_limit_date,
        value: grade.value,
        type: 'installment',
        discount: contract.discount
      });
    }

    await this.cacheProvider.invalidate('users');
    await this.cacheProvider.invalidate(`active-contracts:${grade.id}`);
    return payment;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreatePaymentService;