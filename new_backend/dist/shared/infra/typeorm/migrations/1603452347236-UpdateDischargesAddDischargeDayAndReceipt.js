"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class UpdateDischargesAddDischargeDayAndReceipt1603452347236 {
  async up(queryRunner) {
    await queryRunner.addColumn('discharges', new _typeorm.TableColumn({
      name: 'receipt',
      type: 'varchar',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('discharges', 'receipt');
  }

}

exports.default = UpdateDischargesAddDischargeDayAndReceipt1603452347236;