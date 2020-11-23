"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddDiscountFieldToContractsTable1603981175354 {
  async up(queryRunner) {
    await queryRunner.addColumn('contracts', new _typeorm.TableColumn({
      name: 'discount',
      type: 'decimal',
      default: 0
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('contracts', 'discount');
  }

}

exports.default = AddDiscountFieldToContractsTable1603981175354;