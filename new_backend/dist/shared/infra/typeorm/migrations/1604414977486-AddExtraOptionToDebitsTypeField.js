"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddExtraOptionToDebitsTypeField1604414977486 {
  async up(queryRunner) {
    await queryRunner.dropColumn('debits', 'type');
    await queryRunner.addColumn('debits', new _typeorm.TableColumn({
      name: 'type',
      type: 'enum',
      enum: ['enrollment', 'installment', 'extra']
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('debits', 'type');
    await queryRunner.addColumn('debits', new _typeorm.TableColumn({
      name: 'type',
      type: 'enum',
      enum: ['enrollment', 'installment'],
      default: "'installment'"
    }));
  }

}

exports.default = AddExtraOptionToDebitsTypeField1604414977486;