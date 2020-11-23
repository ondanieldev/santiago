"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTableRelationships1597151477772 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'relationships',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'kinship',
        type: 'varchar'
      }, {
        name: 'person_id',
        type: 'uuid'
      }, {
        name: 'student_id',
        type: 'uuid'
      }]
    }));
    await queryRunner.createForeignKey('relationships', new _typeorm.TableForeignKey({
      name: 'RelationshipsPersonId',
      columnNames: ['person_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'persons',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('relationships', new _typeorm.TableForeignKey({
      name: 'RelationshipsStudentId',
      columnNames: ['student_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'students',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('relationships', 'RelationshipsStudentId');
    await queryRunner.dropForeignKey('relationships', 'RelationshipsPersonId');
    await queryRunner.dropTable('relationships');
  }

}

exports.default = CreateTableRelationships1597151477772;