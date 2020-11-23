"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTableClasses1597151484239 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'grades',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'year',
        type: 'varchar'
      }, {
        name: 'value',
        type: 'decimal'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('grades');
  }

}

exports.default = CreateTableClasses1597151484239;