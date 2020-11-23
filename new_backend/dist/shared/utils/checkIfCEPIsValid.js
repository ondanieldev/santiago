"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function checkIfCEPIsValid(cep) {
  if (!cep.match(/^[0-9]*$/gm)) {
    return false;
  }

  return true;
}

var _default = checkIfCEPIsValid;
exports.default = _default;