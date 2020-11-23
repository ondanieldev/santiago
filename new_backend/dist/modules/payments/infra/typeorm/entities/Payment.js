"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _classTransformer = require("class-transformer");

var _Debit = _interopRequireDefault(require("../../../../debits/infra/typeorm/entities/Debit"));

var _User = _interopRequireDefault(require("../../../../users/infra/typeorm/entities/User"));

var _Discharge = _interopRequireDefault(require("../../../../discharges/infra/typeorm/entities/Discharge"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Payment = (_dec = (0, _typeorm.Entity)('payments'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)({
  type: 'enum',
  enum: ['creditCard', 'debitCard', 'cash', 'check', 'deposit', 'slip']
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)('decimal'), _dec7 = Reflect.metadata("design:type", Number), _dec8 = (0, _typeorm.Column)('boolean'), _dec9 = Reflect.metadata("design:type", Boolean), _dec10 = (0, _typeorm.Column)(), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.Column)('date'), _dec13 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec14 = (0, _typeorm.Column)(), _dec15 = Reflect.metadata("design:type", String), _dec16 = (0, _typeorm.Column)(), _dec17 = Reflect.metadata("design:type", String), _dec18 = (0, _typeorm.CreateDateColumn)(), _dec19 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec20 = (0, _typeorm.OneToOne)(() => _Debit.default, debit => debit.payment), _dec21 = (0, _typeorm.JoinColumn)({
  name: 'debit_id'
}), _dec22 = Reflect.metadata("design:type", typeof _Debit.default === "undefined" ? Object : _Debit.default), _dec23 = (0, _typeorm.ManyToOne)(() => _User.default, user => user.payments), _dec24 = (0, _typeorm.JoinColumn)({
  name: 'user_id'
}), _dec25 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec26 = (0, _typeorm.OneToOne)(() => _Discharge.default, discharge => discharge.payment), _dec27 = Reflect.metadata("design:type", typeof _Discharge.default === "undefined" ? Object : _Discharge.default), _dec28 = (0, _classTransformer.Expose)({
  name: 'receipt_url'
}), _dec29 = Reflect.metadata("design:type", Function), _dec30 = Reflect.metadata("design:paramtypes", []), _dec(_class = (_class2 = (_temp = class Payment {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "method", _descriptor2, this);

    _initializerDefineProperty(this, "amount", _descriptor3, this);

    _initializerDefineProperty(this, "discharged", _descriptor4, this);

    _initializerDefineProperty(this, "receipt", _descriptor5, this);

    _initializerDefineProperty(this, "discharge_day", _descriptor6, this);

    _initializerDefineProperty(this, "debit_id", _descriptor7, this);

    _initializerDefineProperty(this, "user_id", _descriptor8, this);

    _initializerDefineProperty(this, "created_at", _descriptor9, this);

    _initializerDefineProperty(this, "debit", _descriptor10, this);

    _initializerDefineProperty(this, "user", _descriptor11, this);

    _initializerDefineProperty(this, "discharge", _descriptor12, this);
  }

  getReceiptURL() {
    if (!this.receipt) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.receipt}`;

      case 's3':
        return `${_upload.default.config.s3.baseURL}/${this.receipt}`;

      default:
        return null;
    }
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "method", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "amount", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "discharged", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "receipt", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "discharge_day", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "debit_id", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "debit", [_dec20, _dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec23, _dec24, _dec25], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "discharge", [_dec26, _dec27], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "getReceiptURL", [_dec28, _dec29, _dec30], Object.getOwnPropertyDescriptor(_class2.prototype, "getReceiptURL"), _class2.prototype)), _class2)) || _class);
exports.default = Payment;