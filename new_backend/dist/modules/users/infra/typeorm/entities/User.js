"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _classTransformer = require("class-transformer");

var _Profile = _interopRequireDefault(require("../../../../profiles/infra/typeorm/entities/Profile"));

var _Person = _interopRequireDefault(require("../../../../persons/infra/typeorm/entities/Person"));

var _Student = _interopRequireDefault(require("../../../../students/infra/typeorm/entities/Student"));

var _Payment = _interopRequireDefault(require("../../../../payments/infra/typeorm/entities/Payment"));

var _Discharge = _interopRequireDefault(require("../../../../discharges/infra/typeorm/entities/Discharge"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let User = (_dec = (0, _typeorm.Entity)('users'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)(), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)(), _dec7 = (0, _classTransformer.Exclude)(), _dec8 = Reflect.metadata("design:type", String), _dec9 = (0, _typeorm.CreateDateColumn)(), _dec10 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec11 = (0, _typeorm.Column)(), _dec12 = Reflect.metadata("design:type", String), _dec13 = (0, _typeorm.ManyToOne)(() => _Profile.default, profile => profile.users), _dec14 = (0, _typeorm.JoinColumn)({
  name: 'profile_id'
}), _dec15 = Reflect.metadata("design:type", typeof _Profile.default === "undefined" ? Object : _Profile.default), _dec16 = (0, _typeorm.OneToOne)(() => _Person.default, person => person.user), _dec17 = Reflect.metadata("design:type", typeof _Person.default === "undefined" ? Object : _Person.default), _dec18 = (0, _typeorm.OneToOne)(() => _Student.default, student => student.user), _dec19 = Reflect.metadata("design:type", typeof _Student.default === "undefined" ? Object : _Student.default), _dec20 = (0, _typeorm.OneToMany)(() => _Payment.default, payment => payment.user), _dec21 = Reflect.metadata("design:type", Array), _dec22 = (0, _typeorm.OneToMany)(() => _Discharge.default, discharge => discharge.user), _dec23 = Reflect.metadata("design:type", Array), _dec(_class = (_class2 = (_temp = class User {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "username", _descriptor2, this);

    _initializerDefineProperty(this, "password", _descriptor3, this);

    _initializerDefineProperty(this, "created_at", _descriptor4, this);

    _initializerDefineProperty(this, "profile_id", _descriptor5, this);

    _initializerDefineProperty(this, "profile", _descriptor6, this);

    _initializerDefineProperty(this, "person", _descriptor7, this);

    _initializerDefineProperty(this, "student", _descriptor8, this);

    _initializerDefineProperty(this, "payments", _descriptor9, this);

    _initializerDefineProperty(this, "discharges", _descriptor10, this);
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "username", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "password", [_dec6, _dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "profile_id", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "profile", [_dec13, _dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "person", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "student", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "payments", [_dec20, _dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "discharges", [_dec22, _dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var _default = User;
exports.default = _default;