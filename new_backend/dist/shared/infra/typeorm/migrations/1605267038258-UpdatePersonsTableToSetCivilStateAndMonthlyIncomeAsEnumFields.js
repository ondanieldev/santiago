"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class UpdatePersonsTableToSetCivilStateAndMonthlyIncomeAsEnumFields1605267038258 {
  async up(queryRunner) {
    await queryRunner.changeColumn('persons', 'civil_state', new _typeorm.TableColumn({
      name: 'civil_state',
      type: 'enum',
      enum: ['single', 'married', 'divorced', 'widower', 'separeted']
    }));
    await queryRunner.changeColumn('persons', 'monthly_income', new _typeorm.TableColumn({
      name: 'monthly_income',
      type: 'enum',
      enum: ['a_class', 'b_class', 'c_class', 'd_class', 'e_class']
    }));
  }

  async down(queryRunner) {
    await queryRunner.changeColumn('persons', 'monthly_income', new _typeorm.TableColumn({
      name: 'monthly_income',
      type: 'decimal'
    }));
    await queryRunner.changeColumn('persons', 'civil_state', new _typeorm.TableColumn({
      name: 'civil_state',
      type: 'varchar'
    }));
  }

}

exports.default = UpdatePersonsTableToSetCivilStateAndMonthlyIncomeAsEnumFields1605267038258;