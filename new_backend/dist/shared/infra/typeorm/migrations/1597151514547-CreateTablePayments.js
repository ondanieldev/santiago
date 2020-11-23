"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTablePayments1597151514547 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'payments',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'method',
        type: 'enum',
        enum: ['creditCard', 'debitCard', 'cash', 'check', 'deposit', 'slip']
      }, {
        name: 'amount',
        type: 'decimal'
      }, {
        name: 'discharged',
        type: 'boolean',
        default: false
      }, {
        name: 'debit_id',
        type: 'uuid'
      }, {
        name: 'user_id',
        type: 'uuid'
      }]
    }));
    await queryRunner.createForeignKey('payments', new _typeorm.TableForeignKey({
      name: 'PaymentsDebitId',
      columnNames: ['debit_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'debits',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('payments', new _typeorm.TableForeignKey({
      name: 'PaymentsUserId',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('payments', 'PaymentsDebitId');
    await queryRunner.dropForeignKey('payments', 'PaymentsUserId');
    await queryRunner.dropTable('payments');
  }

}

exports.default = CreateTablePayments1597151514547;