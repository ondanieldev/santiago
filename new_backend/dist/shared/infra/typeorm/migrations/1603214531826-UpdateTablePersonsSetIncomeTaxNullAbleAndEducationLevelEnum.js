"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class UpdateTablePersonsSetIncomeTaxNullAbleAndEducationLevelEnum1603214531826 {
  async up(queryRunner) {
    await queryRunner.changeColumn('persons', 'education_level', new _typeorm.TableColumn({
      name: 'education_level',
      type: 'enum',
      enum: ['elementary_incompleted', 'elementary_completed', 'highschool_incompleted', 'highschool_completed', 'university_incompleted', 'university_completed']
    }));
    await queryRunner.changeColumn('persons', 'income_tax', new _typeorm.TableColumn({
      name: 'income_tax',
      type: 'boolean',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.changeColumn('persons', 'income_tax', new _typeorm.TableColumn({
      name: 'income_tax',
      type: 'boolean'
    }));
    await queryRunner.changeColumn('persons', 'education_level', new _typeorm.TableColumn({
      name: 'education_level',
      type: 'varchar'
    }));
  }

}

exports.default = UpdateTablePersonsSetIncomeTaxNullAbleAndEducationLevelEnum1603214531826;