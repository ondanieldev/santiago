"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPersonsRepository = _interopRequireDefault(require("../repositories/IPersonsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdatePersonService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PersonsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPersonsRepository.default === "undefined" ? Object : _IPersonsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdatePersonService {
  constructor(personsRepository) {
    this.personsRepository = personsRepository;
  }

  async execute({
    id,
    ...rest
  }) {
    const person = await this.personsRepository.findById(id);

    if (!person) {
      throw new _AppError.default('não é possível atualizar os dados de uma pessoa inexistente!');
    }

    Object.assign(person, rest);
    await this.personsRepository.save(person);
    return person;
  }

}) || _class) || _class) || _class) || _class);
exports.default = UpdatePersonService;