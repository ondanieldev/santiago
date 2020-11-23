"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddNewPermissionsOnTableProfiles1599095588418 {
  async up(queryRunner) {
    await queryRunner.addColumns('profiles', [new _typeorm.TableColumn({
      name: 'crud_profiles_permiss',
      type: 'boolean',
      default: false
    }), new _typeorm.TableColumn({
      name: 'crud_users_permiss',
      type: 'boolean',
      default: false
    }), new _typeorm.TableColumn({
      name: 'crud_grades_permiss',
      type: 'boolean',
      default: false
    })]);
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('profiles', 'crud_grades_permiss');
    await queryRunner.dropColumn('profiles', 'crud_users_permiss');
    await queryRunner.dropColumn('profiles', 'crud_profiles_permiss');
  }

}

exports.default = AddNewPermissionsOnTableProfiles1599095588418;