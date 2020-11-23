"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class UpdateDateFieldsAndAddDiscountField1603980006875 {
  async up(queryRunner) {
    await queryRunner.changeColumn('debits', 'initial_date', new _typeorm.TableColumn({
      name: 'dicount_limit_date',
      type: 'date'
    }));
    await queryRunner.changeColumn('debits', 'final_date', new _typeorm.TableColumn({
      name: 'payment_limit_date',
      type: 'date'
    }));
    await queryRunner.addColumn('debits', new _typeorm.TableColumn({
      name: 'discount',
      type: 'decimal',
      default: 0
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('debits', 'discount');
    await queryRunner.changeColumn('debits', 'payment_limit_date', new _typeorm.TableColumn({
      name: 'final_date',
      type: 'date'
    }));
    await queryRunner.changeColumn('debits', 'dicount_limit_date', new _typeorm.TableColumn({
      name: 'initial_date',
      type: 'date'
    }));
  }

}

exports.default = UpdateDateFieldsAndAddDiscountField1603980006875;