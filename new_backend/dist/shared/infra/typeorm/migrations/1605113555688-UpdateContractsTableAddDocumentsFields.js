"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class UpdateContractsTableAddDocumentsFields1605113555688 {
  async up(queryRunner) {
    await queryRunner.addColumns('contracts', [new _typeorm.TableColumn({
      name: 'contract_document',
      type: 'varchar',
      isNullable: true
    }), new _typeorm.TableColumn({
      name: 'enrollment_form_document',
      type: 'varchar',
      isNullable: true
    }), new _typeorm.TableColumn({
      name: 'checklist_document',
      type: 'varchar',
      isNullable: true
    })]);
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('contracts', 'checklist_document');
    await queryRunner.dropColumn('contracts', 'enrollment_form_document');
    await queryRunner.dropColumn('contracts', 'contract_document');
  }

}

exports.default = UpdateContractsTableAddDocumentsFields1605113555688;