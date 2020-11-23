"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddCreatedAndUpdatedDateInAllTables1603453714971 {
  async up(queryRunner) {
    await queryRunner.addColumn('profiles', new _typeorm.TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }));
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }));
    await queryRunner.addColumn('persons', new _typeorm.TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }));
    await queryRunner.addColumn('students', new _typeorm.TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }));
    await queryRunner.addColumn('relationships', new _typeorm.TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }));
    await queryRunner.addColumn('grades', new _typeorm.TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }));
    await queryRunner.addColumn('contracts', new _typeorm.TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }));
    await queryRunner.addColumn('agreements', new _typeorm.TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }));
    await queryRunner.addColumn('debits', new _typeorm.TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }));
    await queryRunner.addColumn('payments', new _typeorm.TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'now()'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('payments', 'created_at');
    await queryRunner.dropColumn('debits', 'created_at');
    await queryRunner.dropColumn('agreements', 'created_at');
    await queryRunner.dropColumn('contracts', 'created_at');
    await queryRunner.dropColumn('grades', 'created_at');
    await queryRunner.dropColumn('relationships', 'created_at');
    await queryRunner.dropColumn('students', 'created_at');
    await queryRunner.dropColumn('persons', 'created_at');
    await queryRunner.dropColumn('users', 'created_at');
    await queryRunner.dropColumn('profiles', 'created_at');
  }

}

exports.default = AddCreatedAndUpdatedDateInAllTables1603453714971;