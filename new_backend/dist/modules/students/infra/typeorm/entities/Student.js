"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _classTransformer = require("class-transformer");

var _User = _interopRequireDefault(require("../../../../users/infra/typeorm/entities/User"));

var _Relationship = _interopRequireDefault(require("../../../../relationships/infra/typeorm/entities/Relationship"));

var _Contract = _interopRequireDefault(require("../../../../contracts/infra/typeorm/entities/Contract"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Student = (_dec = (0, _typeorm.Entity)('students'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)(), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.Column)(), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)('date'), _dec11 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec12 = (0, _typeorm.Column)(), _dec13 = Reflect.metadata("design:type", String), _dec14 = (0, _typeorm.Column)(), _dec15 = Reflect.metadata("design:type", String), _dec16 = (0, _typeorm.Column)({
  width: 2
}), _dec17 = Reflect.metadata("design:type", String), _dec18 = (0, _typeorm.Column)({
  type: 'enum',
  enum: ['male', 'female']
}), _dec19 = Reflect.metadata("design:type", String), _dec20 = (0, _typeorm.Column)({
  type: 'enum',
  enum: ['white', 'brown', 'black', 'indigenous', 'yellow']
}), _dec21 = Reflect.metadata("design:type", String), _dec22 = (0, _typeorm.Column)('boolean'), _dec23 = Reflect.metadata("design:type", Boolean), _dec24 = (0, _typeorm.Column)(), _dec25 = Reflect.metadata("design:type", String), _dec26 = (0, _typeorm.Column)(), _dec27 = Reflect.metadata("design:type", String), _dec28 = (0, _typeorm.Column)(), _dec29 = Reflect.metadata("design:type", String), _dec30 = (0, _typeorm.Column)(), _dec31 = Reflect.metadata("design:type", String), _dec32 = (0, _typeorm.Column)(), _dec33 = Reflect.metadata("design:type", String), _dec34 = (0, _typeorm.Column)(), _dec35 = Reflect.metadata("design:type", String), _dec36 = (0, _typeorm.Column)(), _dec37 = Reflect.metadata("design:type", String), _dec38 = (0, _typeorm.Column)(), _dec39 = Reflect.metadata("design:type", String), _dec40 = (0, _typeorm.Column)(), _dec41 = Reflect.metadata("design:type", String), _dec42 = (0, _typeorm.Column)(), _dec43 = Reflect.metadata("design:type", String), _dec44 = (0, _typeorm.Column)(), _dec45 = Reflect.metadata("design:type", String), _dec46 = (0, _typeorm.Column)(), _dec47 = Reflect.metadata("design:type", String), _dec48 = (0, _typeorm.CreateDateColumn)(), _dec49 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec50 = (0, _typeorm.Column)(), _dec51 = Reflect.metadata("design:type", String), _dec52 = (0, _typeorm.OneToOne)(() => _User.default, user => user.student), _dec53 = (0, _typeorm.JoinColumn)({
  name: 'user_id'
}), _dec54 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec55 = (0, _typeorm.OneToMany)(() => _Relationship.default, relationship => relationship.student), _dec56 = Reflect.metadata("design:type", Array), _dec57 = (0, _typeorm.OneToMany)(() => _Contract.default, contract => contract.grade), _dec58 = Reflect.metadata("design:type", Array), _dec59 = (0, _classTransformer.Expose)({
  name: 'birth_certificate_photo_url'
}), _dec60 = Reflect.metadata("design:type", Function), _dec61 = Reflect.metadata("design:paramtypes", []), _dec62 = (0, _classTransformer.Expose)({
  name: 'vaccine_card_photo_url'
}), _dec63 = Reflect.metadata("design:type", Function), _dec64 = Reflect.metadata("design:paramtypes", []), _dec65 = (0, _classTransformer.Expose)({
  name: 'health_plan_photo_url'
}), _dec66 = Reflect.metadata("design:type", Function), _dec67 = Reflect.metadata("design:paramtypes", []), _dec68 = (0, _classTransformer.Expose)({
  name: 'transfer_declaration_photo_url'
}), _dec69 = Reflect.metadata("design:type", Function), _dec70 = Reflect.metadata("design:paramtypes", []), _dec71 = (0, _classTransformer.Expose)({
  name: 'monthly_declaration_photo_url'
}), _dec72 = Reflect.metadata("design:type", Function), _dec73 = Reflect.metadata("design:paramtypes", []), _dec74 = (0, _classTransformer.Expose)({
  name: 'school_records_photo_url'
}), _dec75 = Reflect.metadata("design:type", Function), _dec76 = Reflect.metadata("design:paramtypes", []), _dec(_class = (_class2 = (_temp = class Student {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "name", _descriptor2, this);

    _initializerDefineProperty(this, "father_name", _descriptor3, this);

    _initializerDefineProperty(this, "mother_name", _descriptor4, this);

    _initializerDefineProperty(this, "birth_date", _descriptor5, this);

    _initializerDefineProperty(this, "nacionality", _descriptor6, this);

    _initializerDefineProperty(this, "birth_city", _descriptor7, this);

    _initializerDefineProperty(this, "birth_state", _descriptor8, this);

    _initializerDefineProperty(this, "gender", _descriptor9, this);

    _initializerDefineProperty(this, "race", _descriptor10, this);

    _initializerDefineProperty(this, "ease_relating", _descriptor11, this);

    _initializerDefineProperty(this, "origin_school", _descriptor12, this);

    _initializerDefineProperty(this, "health_plan", _descriptor13, this);

    _initializerDefineProperty(this, "food_alergy", _descriptor14, this);

    _initializerDefineProperty(this, "medication_alergy", _descriptor15, this);

    _initializerDefineProperty(this, "health_problem", _descriptor16, this);

    _initializerDefineProperty(this, "special_necessities", _descriptor17, this);

    _initializerDefineProperty(this, "birth_certificate_photo", _descriptor18, this);

    _initializerDefineProperty(this, "vaccine_card_photo", _descriptor19, this);

    _initializerDefineProperty(this, "health_plan_photo", _descriptor20, this);

    _initializerDefineProperty(this, "transfer_declaration_photo", _descriptor21, this);

    _initializerDefineProperty(this, "monthly_declaration_photo", _descriptor22, this);

    _initializerDefineProperty(this, "school_records_photo", _descriptor23, this);

    _initializerDefineProperty(this, "created_at", _descriptor24, this);

    _initializerDefineProperty(this, "user_id", _descriptor25, this);

    _initializerDefineProperty(this, "user", _descriptor26, this);

    _initializerDefineProperty(this, "relationships", _descriptor27, this);

    _initializerDefineProperty(this, "contracts", _descriptor28, this);
  }

  getBirthCertificatePhotoURL() {
    if (!this.birth_certificate_photo) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.birth_certificate_photo}`;

      case 's3':
        return `${_upload.default.config.s3.baseURL}/${this.birth_certificate_photo}`;

      default:
        return null;
    }
  }

  getVaccineCardPhotoURL() {
    if (!this.vaccine_card_photo) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.vaccine_card_photo}`;

      case 's3':
        return `${_upload.default.config.s3.baseURL}/${this.vaccine_card_photo}`;

      default:
        return null;
    }
  }

  getHealthPlanPhotoURL() {
    if (!this.health_plan_photo) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.health_plan_photo}`;

      case 's3':
        return `${_upload.default.config.s3.baseURL}/${this.health_plan_photo}`;

      default:
        return null;
    }
  }

  getTransferDeclarationPhotoURL() {
    if (!this.transfer_declaration_photo) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.transfer_declaration_photo}`;

      case 's3':
        return `${_upload.default.config.s3.baseURL}/${this.transfer_declaration_photo}`;

      default:
        return null;
    }
  }

  getMonthlyDeclarationPhotoURL() {
    if (!this.monthly_declaration_photo) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.monthly_declaration_photo}`;

      case 's3':
        return `${_upload.default.config.s3.baseURL}/${this.monthly_declaration_photo}`;

      default:
        return null;
    }
  }

  getSchoolRecordsPhotoURL() {
    if (!this.school_records_photo) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.school_records_photo}`;

      case 's3':
        return `${_upload.default.config.s3.baseURL}/${this.school_records_photo}`;

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
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "father_name", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "mother_name", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "birth_date", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "nacionality", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "birth_city", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "birth_state", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "gender", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "race", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "ease_relating", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "origin_school", [_dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "health_plan", [_dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "food_alergy", [_dec28, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "medication_alergy", [_dec30, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "health_problem", [_dec32, _dec33], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "special_necessities", [_dec34, _dec35], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "birth_certificate_photo", [_dec36, _dec37], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "vaccine_card_photo", [_dec38, _dec39], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "health_plan_photo", [_dec40, _dec41], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "transfer_declaration_photo", [_dec42, _dec43], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "monthly_declaration_photo", [_dec44, _dec45], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "school_records_photo", [_dec46, _dec47], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec48, _dec49], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec50, _dec51], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor26 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec52, _dec53, _dec54], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor27 = _applyDecoratedDescriptor(_class2.prototype, "relationships", [_dec55, _dec56], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor28 = _applyDecoratedDescriptor(_class2.prototype, "contracts", [_dec57, _dec58], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "getBirthCertificatePhotoURL", [_dec59, _dec60, _dec61], Object.getOwnPropertyDescriptor(_class2.prototype, "getBirthCertificatePhotoURL"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getVaccineCardPhotoURL", [_dec62, _dec63, _dec64], Object.getOwnPropertyDescriptor(_class2.prototype, "getVaccineCardPhotoURL"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getHealthPlanPhotoURL", [_dec65, _dec66, _dec67], Object.getOwnPropertyDescriptor(_class2.prototype, "getHealthPlanPhotoURL"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getTransferDeclarationPhotoURL", [_dec68, _dec69, _dec70], Object.getOwnPropertyDescriptor(_class2.prototype, "getTransferDeclarationPhotoURL"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMonthlyDeclarationPhotoURL", [_dec71, _dec72, _dec73], Object.getOwnPropertyDescriptor(_class2.prototype, "getMonthlyDeclarationPhotoURL"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getSchoolRecordsPhotoURL", [_dec74, _dec75, _dec76], Object.getOwnPropertyDescriptor(_class2.prototype, "getSchoolRecordsPhotoURL"), _class2.prototype)), _class2)) || _class);
exports.default = Student;