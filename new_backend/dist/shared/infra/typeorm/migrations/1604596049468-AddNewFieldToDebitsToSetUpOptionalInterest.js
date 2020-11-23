"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddNewFieldToDebitsToSetUpOptionalInterest1604596049468 {
  async up(queryRunner) {
    await queryRunner.addColumn('debits', new _typeorm.TableColumn({
      name: 'apply_interest_rules',
      type: 'boolean',
      default: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('debits', 'apply_interest_rules');
  }

}

exports.default = AddNewFieldToDebitsToSetUpOptionalInterest1604596049468;