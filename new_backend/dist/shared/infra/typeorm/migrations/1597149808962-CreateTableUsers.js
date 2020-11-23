"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTableUsers1597149808962 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'username',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'profile_id',
        type: 'uuid',
        isNullable: true
      }]
    }));
    await queryRunner.createForeignKey('users', new _typeorm.TableForeignKey({
      name: 'UsersProfileId',
      columnNames: ['profile_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'profiles',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('users', 'UsersProfileId');
    await queryRunner.dropTable('users');
  }

}

exports.default = CreateTableUsers1597149808962;