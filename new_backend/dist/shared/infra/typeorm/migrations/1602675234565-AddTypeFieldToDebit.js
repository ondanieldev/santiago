"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddTypeFieldToDebit1602675234565 {
  async up(queryRunner) {
    await queryRunner.addColumn('debits', new _typeorm.TableColumn({
      name: 'type',
      type: 'enum',
      enum: ['enrollment', 'installment'],
      default: "'installment'"
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('debits', 'type');
  }

}

exports.default = AddTypeFieldToDebit1602675234565;