"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _classTransformer = require("class-transformer");

var _Payment = _interopRequireDefault(require("../../../../payments/infra/typeorm/entities/Payment"));

var _User = _interopRequireDefault(require("../../../../users/infra/typeorm/entities/User"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Discharge = (_dec = (0, _typeorm.Entity)('discharges'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.CreateDateColumn)(), _dec7 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec8 = (0, _typeorm.Column)(), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)(), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.OneToOne)(() => _Payment.default, payment => payment.discharge), _dec13 = (0, _typeorm.JoinColumn)({
  name: 'payment_id'
}), _dec14 = Reflect.metadata("design:type", typeof _Payment.default === "undefined" ? Object : _Payment.default), _dec15 = (0, _typeorm.ManyToOne)(() => _User.default, user => user.discharges), _dec16 = (0, _typeorm.JoinColumn)({
  name: 'user_id'
}), _dec17 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec18 = (0, _classTransformer.Expose)({
  name: 'receipt_url'
}), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", []), _dec(_class = (_class2 = (_temp = class Discharge {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "receipt", _descriptor2, this);

    _initializerDefineProperty(this, "created_at", _descriptor3, this);

    _initializerDefineProperty(this, "payment_id", _descriptor4, this);

    _initializerDefineProperty(this, "user_id", _descriptor5, this);

    _initializerDefineProperty(this, "payment", _descriptor6, this);

    _initializerDefineProperty(this, "user", _descriptor7, this);
  }

  getReceiptURL() {
    if (!this.receipt) {
      return null;
    }

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.receipt}`;
        break;

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
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "receipt", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "payment_id", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "user_id", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "payment", [_dec12, _dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "getReceiptURL", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "getReceiptURL"), _class2.prototype)), _class2)) || _class);
exports.default = Discharge;