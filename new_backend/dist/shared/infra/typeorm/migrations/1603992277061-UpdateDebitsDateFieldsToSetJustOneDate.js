"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class UpdateDebitsDateFieldsToSetJustOneDate1603992277061 {
  async up(queryRunner) {
    await queryRunner.dropColumn('debits', 'dicount_limit_date');
  }

  async down(queryRunner) {
    await queryRunner.addColumn('debits', new _typeorm.TableColumn({
      name: 'dicount_limit_date',
      type: 'date'
    }));
  }

}

exports.default = UpdateDebitsDateFieldsToSetJustOneDate1603992277061;