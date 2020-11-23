"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class RemakeProfilePermissions1604596214996 {
  async up(queryRunner) {
    await queryRunner.changeColumn('profiles', 'new_enrollment_permiss', new _typeorm.TableColumn({
      name: 'create_new_enrollments_permiss',
      type: 'boolean',
      default: false
    }));
    await queryRunner.changeColumn('profiles', 'validate_enrollment_permiss', new _typeorm.TableColumn({
      name: 'validate_enrollments_permiss',
      type: 'boolean',
      default: false
    }));
    await queryRunner.changeColumn('profiles', 'pay_debit_permiss', new _typeorm.TableColumn({
      name: 'pay_debits_permiss',
      type: 'boolean',
      default: false
    }));
    await queryRunner.changeColumn('profiles', 'discharge_payment_permiss', new _typeorm.TableColumn({
      name: 'discharge_payments_permiss',
      type: 'boolean',
      default: false
    }));
    await queryRunner.addColumn('profiles', new _typeorm.TableColumn({
      name: 'create_extra_debits_permiss',
      type: 'boolean',
      default: false
    }));
    await queryRunner.addColumn('profiles', new _typeorm.TableColumn({
      name: 'crud_extra_debits_permiss',
      type: 'boolean',
      default: false
    }));
  }

  async down(queryRunner) {
    await queryRunner.changeColumn('profiles', 'create_new_enrollments_permiss', new _typeorm.TableColumn({
      name: 'new_enrollment_permiss',
      type: 'boolean',
      default: false
    }));
    await queryRunner.changeColumn('profiles', 'validate_enrollments_permiss', new _typeorm.TableColumn({
      name: 'validate_enrollment_permiss',
      type: 'boolean',
      default: false
    }));
    await queryRunner.changeColumn('profiles', 'pay_debits_permiss', new _typeorm.TableColumn({
      name: 'pay_debit_permiss',
      type: 'boolean',
      default: false
    }));
    await queryRunner.changeColumn('profiles', 'discharge_payments_permiss', new _typeorm.TableColumn({
      name: 'discharge_payment_permiss',
      type: 'boolean',
      default: false
    }));
    await queryRunner.dropColumn('profiles', 'create_extra_debits_permiss');
    await queryRunner.dropColumn('profiles', 'crud_extra_debits_permiss');
  }

}

exports.default = RemakeProfilePermissions1604596214996;