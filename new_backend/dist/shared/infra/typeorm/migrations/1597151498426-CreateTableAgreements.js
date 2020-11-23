"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTableAgreements1597151498426 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'agreements',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'responsible_type',
        type: 'enum',
        enum: ['financial', 'supportive']
      }, {
        name: 'person_id',
        type: 'uuid'
      }, {
        name: 'contract_id',
        type: 'uuid'
      }]
    }));
    await queryRunner.createForeignKey('agreements', new _typeorm.TableForeignKey({
      name: 'AgreementsPersonId',
      columnNames: ['person_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'persons',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('agreements', new _typeorm.TableForeignKey({
      name: 'AgreementsContractId',
      columnNames: ['contract_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'contracts',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('agreements', 'AgreementsPersonId');
    await queryRunner.dropForeignKey('agreements', 'AgreementsContractId');
    await queryRunner.dropTable('agreements');
  }

}

exports.default = CreateTableAgreements1597151498426;