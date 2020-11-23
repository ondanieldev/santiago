"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTableDischarges1597151521410 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'discharges',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'payment_id',
        type: 'uuid'
      }, {
        name: 'user_id',
        type: 'uuid'
      }]
    }));
    await queryRunner.createForeignKey('discharges', new _typeorm.TableForeignKey({
      name: 'DischargesPaymentId',
      columnNames: ['payment_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'payments',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('discharges', new _typeorm.TableForeignKey({
      name: 'DischargesUserId',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('discharges', 'DischargesPaymentId');
    await queryRunner.dropForeignKey('discharges', 'DischargesUserId');
    await queryRunner.dropTable('discharges');
  }

}

exports.default = CreateTableDischarges1597151521410;