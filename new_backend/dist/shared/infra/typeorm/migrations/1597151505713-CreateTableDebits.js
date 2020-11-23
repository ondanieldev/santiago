"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTableDebits1597151505713 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'debits',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'value',
        type: 'decimal'
      }, {
        name: 'paid',
        type: 'boolean',
        default: false
      }, {
        name: 'description',
        type: 'varchar'
      }, {
        name: 'initial_date',
        type: 'date'
      }, {
        name: 'final_date',
        type: 'date'
      }, {
        name: 'contract_id',
        type: 'uuid'
      }]
    }));
    await queryRunner.createForeignKey('debits', new _typeorm.TableForeignKey({
      name: 'DebitsContractId',
      columnNames: ['contract_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'contracts',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('debits', 'DebitsContractId');
    await queryRunner.dropTable('debits');
  }

}

exports.default = CreateTableDebits1597151505713;