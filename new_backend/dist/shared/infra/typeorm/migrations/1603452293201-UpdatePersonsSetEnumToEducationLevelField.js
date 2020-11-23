"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class UpdatePersonsSetEnumToEducationLevelField1603452293201 {
  async up(queryRunner) {
    await queryRunner.changeColumn('persons', 'education_level', new _typeorm.TableColumn({
      name: 'education_level',
      type: 'enum',
      enum: ['elementary_incompleted', 'elementary_completed', 'highschool_incompleted', 'highschool_completed', 'university_incompleted', 'university_completed']
    }));
  }

  async down(queryRunner) {
    await queryRunner.changeColumn('persons', 'education_level', new _typeorm.TableColumn({
      name: 'education_level',
      type: 'varchar'
    }));
  }

}

exports.default = UpdatePersonsSetEnumToEducationLevelField1603452293201;