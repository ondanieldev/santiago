"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTableProfiles1597145545146 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'profiles',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'new_enrollment_permiss',
        type: 'boolean',
        default: false
      }, {
        name: 'validate_enrollment_permiss',
        type: 'boolean',
        default: false
      }, {
        name: 'pay_debit_permiss',
        type: 'boolean',
        default: false
      }, {
        name: 'discharge_payment_permiss',
        type: 'boolean',
        default: false
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('profiles');
  }

}

exports.default = CreateTableProfiles1597145545146;