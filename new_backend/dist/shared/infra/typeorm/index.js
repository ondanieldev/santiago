"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = postgresConnect;

var _typeorm = require("typeorm");

async function postgresConnect() {
  try {
    await (0, _typeorm.createConnection)();
    console.log('Postgres running!');
  } catch {
    console.log('[!] POSTGRES NOT CONNECTED');
  }
}