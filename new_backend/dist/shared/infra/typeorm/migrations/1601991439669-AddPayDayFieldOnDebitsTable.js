"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddPayDayFieldOnDebitsTable1601991439669 {
  async up(queryRunner) {
    await queryRunner.addColumn('debits', new _typeorm.TableColumn({
      name: 'payday',
      type: 'date',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('debits', 'payday');
  }

}

exports.default = AddPayDayFieldOnDebitsTable1601991439669;