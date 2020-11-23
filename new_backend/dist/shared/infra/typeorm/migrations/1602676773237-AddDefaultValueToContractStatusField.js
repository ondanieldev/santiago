"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddDefaultValueToContractStatusField1602676773237 {
  async up(queryRunner) {
    await queryRunner.changeColumn('contracts', 'status', new _typeorm.TableColumn({
      name: 'status',
      type: 'enum',
      enum: ['underAnalysis', 'pendent', 'accepted', 'active'],
      default: "'underAnalysis'"
    }));
  }

  async down(queryRunner) {
    await queryRunner.changeColumn('contracts', 'status', new _typeorm.TableColumn({
      name: 'status',
      type: 'enum',
      enum: ['underAnalysis', 'pendent', 'accepted', 'active']
    }));
  }

}

exports.default = AddDefaultValueToContractStatusField1602676773237;