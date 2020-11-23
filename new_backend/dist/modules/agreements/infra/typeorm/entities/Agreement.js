"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Person = _interopRequireDefault(require("../../../../persons/infra/typeorm/entities/Person"));

var _Contract = _interopRequireDefault(require("../../../../contracts/infra/typeorm/entities/Contract"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Agreement = (_dec = (0, _typeorm.Entity)('agreements'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)(), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)({
  type: 'enum',
  enum: ['financial', 'supportive', 'educational']
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.CreateDateColumn)(), _dec7 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec8 = (0, _typeorm.Column)(), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _typeorm.Column)(), _dec11 = Reflect.metadata("design:type", String), _dec12 = (0, _typeorm.ManyToOne)(() => _Person.default, person => person.agreements), _dec13 = (0, _typeorm.JoinColumn)({
  name: 'person_id'
}), _dec14 = Reflect.metadata("design:type", typeof _Person.default === "undefined" ? Object : _Person.default), _dec15 = (0, _typeorm.ManyToOne)(() => _Contract.default, contract => contract.agreements), _dec16 = (0, _typeorm.JoinColumn)({
  name: 'contract_id'
}), _dec17 = Reflect.metadata("design:type", typeof _Contract.default === "undefined" ? Object : _Contract.default), _dec(_class = (_class2 = (_temp = class Agreement {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "responsible_type", _descriptor2, this);

    _initializerDefineProperty(this, "created_at", _descriptor3, this);

    _initializerDefineProperty(this, "person_id", _descriptor4, this);

    _initializerDefineProperty(this, "contract_id", _descriptor5, this);

    _initializerDefineProperty(this, "person", _descriptor6, this);

    _initializerDefineProperty(this, "contract", _descriptor7, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "responsible_type", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "person_id", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "contract_id", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "person", [_dec12, _dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "contract", [_dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.default = Agreement;