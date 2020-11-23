"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class UpdateStudentsTableToSetBirthStateTo2CaractersLimit1605267126757 {
  async up(queryRunner) {
    await queryRunner.changeColumn('students', 'birth_state', new _typeorm.TableColumn({
      name: 'birth_state',
      type: 'varchar',
      width: 2
    }));
  }

  async down(queryRunner) {
    await queryRunner.changeColumn('students', 'birth_state', new _typeorm.TableColumn({
      name: 'birth_state',
      type: 'varchar'
    }));
  }

}

exports.default = UpdateStudentsTableToSetBirthStateTo2CaractersLimit1605267126757;