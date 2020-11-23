"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../models/ICacheProvider"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let InvalidateCacheService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class InvalidateCacheService {
  constructor(cacheProvider) {
    this.cacheProvider = cacheProvider;
  }

  async execute() {
    await this.cacheProvider.invalidate('grades');
    await this.cacheProvider.invalidate('profiles');
    await this.cacheProvider.invalidate('users');
  }

}) || _class) || _class) || _class) || _class);
exports.default = InvalidateCacheService;