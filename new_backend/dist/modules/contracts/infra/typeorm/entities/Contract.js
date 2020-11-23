"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _classTransformer = require("class-transformer");

var _Grade = _interopRequireDefault(require("../../../../grades/infra/typeorm/entities/Grade"));

var _Student = _interopRequireDefault(require("../../../../students/infra/typeorm/entities/Student"));

var _Agreement = _interopRequireDefault(require("../../../../agreements/infra/typeorm/entities/Agreement"));

var _Debit = _interopRequireDefault(require("../../../../debits/infra/typeorm/entities/Debit"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Contract = (_dec = (0, _typeorm.Entity)('contracts'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)({
  type: 'enum',
  enum: ['underAnalysis', 'pendent', 'accepted', 'active']
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)(), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.CreateDateColumn)(), _dec9 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec10 = (0, _typeorm.Column)(), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.Column)(), _dec13 = Reflect.metadata("design:type", String), _dec14 = (0, _typeorm.Column)('decimal'), _dec15 = Reflect.metadata("design:type", Number), _dec16 = (0, _typeorm.Column)(), _dec17 = Reflect.metadata("design:type", String), _dec18 = (0, _typeorm.Column)(), _dec19 = Reflect.metadata("design:type", String), _dec20 = (0, _typeorm.Column)(), _dec21 = Reflect.metadata("design:type", String), _dec22 = (0, _typeorm.ManyToOne)(() => _Student.default, student => student.contracts), _dec23 = (0, _typeorm.JoinColumn)({
  name: 'student_id'
}), _dec24 = Reflect.metadata("design:type", typeof _Student.default === "undefined" ? Object : _Student.default), _dec25 = (0, _typeorm.ManyToOne)(() => _Grade.default, grade => grade.contracts), _dec26 = (0, _typeorm.JoinColumn)({
  name: 'grade_id'
}), _dec27 = Reflect.metadata("design:type", typeof _Grade.default === "undefined" ? Object : _Grade.default), _dec28 = (0, _typeorm.OneToMany)(() => _Agreement.default, agreement => agreement.contract), _dec29 = Reflect.metadata("design:type", Array), _dec30 = (0, _typeorm.OneToMany)(() => _Debit.default, debit => debit.contract), _dec31 = Reflect.metadata("design:type", Array), _dec32 = (0, _classTransformer.Expose)({
  name: 'contract_document'
}), _dec33 = Reflect.metadata("design:type", Function), _dec34 = Reflect.metadata("design:paramtypes", []), _dec35 = (0, _classTransformer.Expose)({
  name: 'enrollment_form_document'
}), _dec36 = Reflect.metadata("design:type", Function), _dec37 = Reflect.metadata("design:paramtypes", []), _dec38 = (0, _classTransformer.Expose)({
  name: 'checklist_document'
}), _dec39 = Reflect.metadata("design:type", Function), _dec40 = Reflect.metadata("design:paramtypes", []), _dec(_class = (_class2 = (_temp = class Contract {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "status", _descriptor2, this);

    _initializerDefineProperty(this, "comment", _descriptor3, this);

    _initializerDefineProperty(this, "created_at", _descriptor4, this);

    _initializerDefineProperty(this, "student_id", _descriptor5, this);

    _initializerDefineProperty(this, "grade_id", _descriptor6, this);

    _initializerDefineProperty(this, "discount", _descriptor7, this);

    _initializerDefineProperty(this, "checklist_document", _descriptor8, this);

    _initializerDefineProperty(this, "enrollment_form_document", _descriptor9, this);

    _initializerDefineProperty(this, "contract_document", _descriptor10, this);

    _initializerDefineProperty(this, "student", _descriptor11, this);

    _initializerDefineProperty(this, "grade", _descriptor12, this);

    _initializerDefineProperty(this, "agreements", _descriptor13, this);

    _initializerDefineProperty(this, "debits", _descriptor14, this);
  }

  getContractDocumentURL() {
    if (!this.contract_document) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.contract_document}`;

      case 's3':
        return `${_upload.default.config.s3.baseURL}/${this.contract_document}`;

      default:
        return null;
    }
  }

  getEnrollmentFormDocumentURL() {
    if (!this.enrollment_form_document) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.enrollment_form_document}`;

      case 's3':
        return `${_upload.default.config.s3.baseURL}/${this.enrollment_form_document}`;

      default:
        return null;
    }
  }

  getChecklistDocumentURL() {
    if (!this.checklist_document) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.checklist_document}`;

      case 's3':
        return `${_upload.default.config.s3.baseURL}/${this.checklist_document}`;

      default:
        return null;
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "status", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "comment", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "student_id", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "grade_id", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "discount", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "checklist_document", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "enrollment_form_document", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "contract_document", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "student", [_dec22, _dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "grade", [_dec25, _dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "agreements", [_dec28, _dec29], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "debits", [_dec30, _dec31], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "getContractDocumentURL", [_dec32, _dec33, _dec34], Object.getOwnPropertyDescriptor(_class2.prototype, "getContractDocumentURL"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getEnrollmentFormDocumentURL", [_dec35, _dec36, _dec37], Object.getOwnPropertyDescriptor(_class2.prototype, "getEnrollmentFormDocumentURL"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getChecklistDocumentURL", [_dec38, _dec39, _dec40], Object.getOwnPropertyDescriptor(_class2.prototype, "getChecklistDocumentURL"), _class2.prototype)), _class2)) || _class);
exports.default = Contract;