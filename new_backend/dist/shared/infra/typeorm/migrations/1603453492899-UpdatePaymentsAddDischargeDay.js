"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class UpdatePaymentsAddDischargeDay1603453492899 {
  async up(queryRunner) {
    await queryRunner.addColumn('payments', new _typeorm.TableColumn({
      name: 'discharge_day',
      type: 'date',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('payments', 'discharge_day');
  }

}

exports.default = UpdatePaymentsAddDischargeDay1603453492899;