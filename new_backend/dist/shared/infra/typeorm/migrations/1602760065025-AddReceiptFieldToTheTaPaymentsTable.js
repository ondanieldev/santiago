"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddReceiptFieldToTheTaPaymentsTable1602760065025 {
  async up(queryRunner) {
    await queryRunner.addColumn('payments', new _typeorm.TableColumn({
      name: 'receipt',
      type: 'varchar',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('payments', 'receipt');
  }

}

exports.default = AddReceiptFieldToTheTaPaymentsTable1602760065025;