"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateTablePersons1597150359732 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'persons',
      columns: [{
        name: 'id',
        type: 'uuid',
        isUnique: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'birth_date',
        type: 'date'
      }, {
        name: 'nacionality',
        type: 'varchar'
      }, {
        name: 'civil_state',
        type: 'varchar'
      }, {
        name: 'profission',
        type: 'varchar'
      }, {
        name: 'cpf',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'rg',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'address_street',
        type: 'varchar'
      }, {
        name: 'address_number',
        type: 'varchar'
      }, {
        name: 'address_complement',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'address_neighborhood',
        type: 'varchar'
      }, {
        name: 'address_city',
        type: 'varchar'
      }, {
        name: 'address_cep',
        type: 'varchar'
      }, {
        name: 'residencial_phone',
        type: 'varchar'
      }, {
        name: 'commercial_phone',
        type: 'varchar'
      }, {
        name: 'personal_phone',
        type: 'varchar'
      }, {
        name: 'education_level',
        type: 'varchar'
      }, {
        name: 'workplace',
        type: 'varchar'
      }, {
        name: 'monthly_income',
        type: 'decimal'
      }, {
        name: 'income_tax',
        type: 'boolean'
      }, {
        name: 'cpf_photo',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'rg_photo',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'residencial_proof_photo',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'user_id',
        type: 'uuid',
        isNullable: true
      }]
    }));
    await queryRunner.createForeignKey('persons', new _typeorm.TableForeignKey({
      name: 'PersonsUserId',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('persons', 'PersonsUserId');
    await queryRunner.dropTable('persons');
  }

}

exports.default = CreateTablePersons1597150359732;