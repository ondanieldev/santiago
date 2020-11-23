"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _CacheController = _interopRequireDefault(require("../controllers/CacheController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cacheRoutes = (0, _express.Router)();
const cacheController = new _CacheController.default();
cacheRoutes.put('/invalidate', cacheController.update);
var _default = cacheRoutes;
exports.default = _default;