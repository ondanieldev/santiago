"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _classTransformer = require("class-transformer");

var _User = _interopRequireDefault(require("../../../../users/infra/typeorm/entities/User"));

var _Relationship = _interopRequireDefault(require("../../../../relationships/infra/typeorm/entities/Relationship"));

var _Agreement = _interopRequireDefault(require("../../../../agreements/infra/typeorm/entities/Agreement"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Person = (_dec = (0, _typeorm.Entity)('persons'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)('date'), _dec7 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec8 = (0, _typeorm.Column)(), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)({
  enum: ['single', 'married', 'divorced', 'widower', 'separeted']
}), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.Column)(), _dec13 = Reflect.metadata("design:type", String), _dec14 = (0, _typeorm.Column)(), _dec15 = Reflect.metadata("design:type", String), _dec16 = (0, _typeorm.Column)(), _dec17 = Reflect.metadata("design:type", String), _dec18 = (0, _typeorm.Column)(), _dec19 = Reflect.metadata("design:type", String), _dec20 = (0, _typeorm.Column)(), _dec21 = Reflect.metadata("design:type", String), _dec22 = (0, _typeorm.Column)(), _dec23 = Reflect.metadata("design:type", String), _dec24 = (0, _typeorm.Column)(), _dec25 = Reflect.metadata("design:type", String), _dec26 = (0, _typeorm.Column)(), _dec27 = Reflect.metadata("design:type", String), _dec28 = (0, _typeorm.Column)(), _dec29 = Reflect.metadata("design:type", String), _dec30 = (0, _typeorm.Column)(), _dec31 = Reflect.metadata("design:type", String), _dec32 = (0, _typeorm.Column)(), _dec33 = Reflect.metadata("design:type", String), _dec34 = (0, _typeorm.Column)(), _dec35 = Reflect.metadata("design:type", String), _dec36 = (0, _typeorm.Column)(), _dec37 = Reflect.metadata("design:type", String), _dec38 = (0, _typeorm.Column)(), _dec39 = Reflect.metadata("design:type", String), _dec40 = (0, _typeorm.Column)({
  enum: ['a_class', 'b_class', 'c_class', 'd_class', 'e_class']
}), _dec41 = Reflect.metadata("design:type", String), _dec42 = (0, _typeorm.Column)('boolean'), _dec43 = Reflect.metadata("design:type", Boolean), _dec44 = (0, _typeorm.Column)(), _dec45 = Reflect.metadata("design:type", String), _dec46 = (0, _typeorm.Column)(), _dec47 = Reflect.metadata("design:type", String), _dec48 = (0, _typeorm.Column)(), _dec49 = Reflect.metadata("design:type", String), _dec50 = (0, _typeorm.Column)(), _dec51 = Reflect.metadata("design:type", String), _dec52 = (0, _typeorm.CreateDateColumn)(), _dec53 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec54 = (0, _typeorm.Column)(), _dec55 = Reflect.metadata("design:type", String), _dec56 = (0, _typeorm.OneToOne)(() => _User.default, user => user.person), _dec57 = (0, _typeorm.JoinColumn)({
  name: 'user_id'
}), _dec58 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec59 = (0, _typeorm.OneToMany)(() => _Relationship.default, relationship => relationship.person), _dec60 = Reflect.metadata("design:type", Array), _dec61 = (0, _typeorm.OneToMany)(() => _Agreement.default, agreement => agreement.person), _dec62 = Reflect.metadata("design:type", Array), _dec63 = (0, _classTransformer.Expose)({
  name: 'cpf_photo_url'
}), _dec64 = Reflect.metadata("design:type", Function), _dec65 = Reflect.metadata("design:paramtypes", []), _dec66 = (0, _classTransformer.Expose)({
  name: 'rg_photo_url'
}), _dec67 = Reflect.metadata("design:type", Function), _dec68 = Reflect.metadata("design:paramtypes", []), _dec69 = (0, _classTransformer.Expose)({
  name: 'residencial_proof_photo_url'
}), _dec70 = Reflect.metadata("design:type", Function), _dec71 = Reflect.metadata("design:paramtypes", []), _dec(_class = (_class2 = (_temp = class Person {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "name", _descriptor2, this);

    _initializerDefineProperty(this, "birth_date", _descriptor3, this);

    _initializerDefineProperty(this, "nacionality", _descriptor4, this);

    _initializerDefineProperty(this, "civil_state", _descriptor5, this);

    _initializerDefineProperty(this, "profission", _descriptor6, this);

    _initializerDefineProperty(this, "cpf", _descriptor7, this);

    _initializerDefineProperty(this, "rg", _descriptor8, this);

    _initializerDefineProperty(this, "address_street", _descriptor9, this);

    _initializerDefineProperty(this, "address_number", _descriptor10, this);

    _initializerDefineProperty(this, "address_complement", _descriptor11, this);

    _initializerDefineProperty(this, "address_neighborhood", _descriptor12, this);

    _initializerDefineProperty(this, "address_city", _descriptor13, this);

    _initializerDefineProperty(this, "address_cep", _descriptor14, this);

    _initializerDefineProperty(this, "residencial_phone", _descriptor15, this);

    _initializerDefineProperty(this, "commercial_phone", _descriptor16, this);

    _initializerDefineProperty(this, "personal_phone", _descriptor17, this);

    _initializerDefineProperty(this, "education_level", _descriptor18, this);

    _initializerDefineProperty(this, "workplace", _descriptor19, this);

    _initializerDefineProperty(this, "monthly_income", _descriptor20, this);

    _initializerDefineProperty(this, "income_tax", _descriptor21, this);

    _initializerDefineProperty(this, "cpf_photo", _descriptor22, this);

    _initializerDefineProperty(this, "rg_photo", _descriptor23, this);

    _initializerDefineProperty(this, "residencial_proof_photo", _descriptor24, this);

    _initializerDefineProperty(this, "email", _descriptor25, this);

    _initializerDefineProperty(this, "created_at", _descriptor26, this);

    _initializerDefineProperty(this, "user_id", _descriptor27, this);

    _initializerDefineProperty(this, "user", _descriptor28, this);

    _initializerDefineProperty(this, "relationships", _descriptor29, this);

    _initializerDefineProperty(this, "agreements", _descriptor30, this);
  }

  getCpfPhotoURL() {
    if (!this.cpf_photo) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.cpf_photo}`;

      case 's3':
        return `${_upload.default.config.s3.baseURL}/${this.cpf_photo}`;

      default:
        return null;
    }
  }

  getRgPhotoURL() {
    if (!this.rg_photo) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.rg_photo}`;

      case 's3':
        return `${_upload.default.config.s3.baseURL}/${this.rg_photo}`;

      default:
        return null;
    }
  }

  getResidencialProofPhotoURL() {
    if (!this.residencial_proof_photo) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.residencial_proof_photo}`;

      case 's3':
        return `${_upload.default.config.s3.baseURL}/${this.residencial_proof_photo}`;

      default:
        return null;
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "birth_date", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nacionality", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "civil_state", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "profission", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "cpf", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "rg", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "address_street", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "address_number", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "address_complement", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "address_neighborhood", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "address_city", [_dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "address_cep", [_dec28, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "residencial_phone", [_dec30, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "commercial_phone", [_dec32, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "personal_phone", [_dec34, _dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "education_level", [_dec36, _dec37], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "workplace", [_dec38, _dec39], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "monthly_income", [_dec40, _dec41], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "income_tax", [_dec42, _dec43], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "cpf_photo", [_dec44, _dec45], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "rg_photo", [_dec46, _dec47], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "residencial_proof_photo", [_dec48, _dec49], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "email", [_dec50, _dec51], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec52, _dec53], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec54, _dec55], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec56, _dec57, _dec58], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor29 = _applyDecoratedDescriptor(_class2.prototype, "relationships", [_dec59, _dec60], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor30 = _applyDecoratedDescriptor(_class2.prototype, "agreements", [_dec61, _dec62], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "getCpfPhotoURL", [_dec63, _dec64, _dec65], Object.getOwnPropertyDescriptor(_class2.prototype, "getCpfPhotoURL"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRgPhotoURL", [_dec66, _dec67, _dec68], Object.getOwnPropertyDescriptor(_class2.prototype, "getRgPhotoURL"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getResidencialProofPhotoURL", [_dec69, _dec70, _dec71], Object.getOwnPropertyDescriptor(_class2.prototype, "getResidencialProofPhotoURL"), _class2.prototype)), _class2)) || _class);
exports.default = Person;