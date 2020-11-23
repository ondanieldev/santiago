"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTableContracts1597151491158 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'contracts',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'status',
        type: 'enum',
        enum: ['underAnalysis', 'pendent', 'accepted', 'active']
      }, {
        name: 'comment',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'student_id',
        type: 'uuid'
      }, {
        name: 'grade_id',
        type: 'uuid'
      }]
    }));
    await queryRunner.createForeignKey('contracts', new _typeorm.TableForeignKey({
      name: 'ContractsStudentId',
      columnNames: ['student_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'students',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('contracts', new _typeorm.TableForeignKey({
      name: 'ContractsGradeId',
      columnNames: ['grade_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'grades',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('contracts', 'ContractsStudentId');
    await queryRunner.dropForeignKey('contracts', 'ContractsGradeId');
    await queryRunner.dropTable('contracts');
  }

}

exports.default = CreateTableContracts1597151491158;