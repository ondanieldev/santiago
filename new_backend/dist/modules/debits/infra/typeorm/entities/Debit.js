"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Contract = _interopRequireDefault(require("../../../../contracts/infra/typeorm/entities/Contract"));

var _Payment = _interopRequireDefault(require("../../../../payments/infra/typeorm/entities/Payment"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Debit = (_dec = (0, _typeorm.Entity)('debits'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)('decimal'), _dec5 = Reflect.metadata("design:type", Number), _dec6 = (0, _typeorm.Column)('boolean'), _dec7 = Reflect.metadata("design:type", Boolean), _dec8 = (0, _typeorm.Column)(), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)('date'), _dec11 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec12 = (0, _typeorm.Column)('decimal'), _dec13 = Reflect.metadata("design:type", Number), _dec14 = (0, _typeorm.Column)('date'), _dec15 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec16 = (0, _typeorm.Column)('boolean'), _dec17 = Reflect.metadata("design:type", Boolean), _dec18 = (0, _typeorm.Column)({
  type: 'enum',
  enum: ['enrollment', 'installment', 'extra']
}), _dec19 = Reflect.metadata("design:type", String), _dec20 = (0, _typeorm.CreateDateColumn)(), _dec21 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec22 = (0, _typeorm.Column)(), _dec23 = Reflect.metadata("design:type", String), _dec24 = (0, _typeorm.ManyToOne)(() => _Contract.default, contract => contract.debits), _dec25 = (0, _typeorm.JoinColumn)({
  name: 'contract_id'
}), _dec26 = Reflect.metadata("design:type", typeof _Contract.default === "undefined" ? Object : _Contract.default), _dec27 = (0, _typeorm.OneToOne)(() => _Payment.default, payment => payment.debit), _dec28 = Reflect.metadata("design:type", typeof _Payment.default === "undefined" ? Object : _Payment.default), _dec(_class = (_class2 = (_temp = class Debit {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "value", _descriptor2, this);

    _initializerDefineProperty(this, "paid", _descriptor3, this);

    _initializerDefineProperty(this, "description", _descriptor4, this);

    _initializerDefineProperty(this, "payment_limit_date", _descriptor5, this);

    _initializerDefineProperty(this, "discount", _descriptor6, this);

    _initializerDefineProperty(this, "payday", _descriptor7, this);

    _initializerDefineProperty(this, "apply_interest_rules", _descriptor8, this);

    _initializerDefineProperty(this, "type", _descriptor9, this);

    _initializerDefineProperty(this, "created_at", _descriptor10, this);

    _initializerDefineProperty(this, "contract_id", _descriptor11, this);

    _initializerDefineProperty(this, "contract", _descriptor12, this);

    _initializerDefineProperty(this, "payment", _descriptor13, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "paid", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "description", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "payment_limit_date", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "discount", [_dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "payday", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "apply_interest_rules", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "contract_id", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "contract", [_dec24, _dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "payment", [_dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.default = Debit;