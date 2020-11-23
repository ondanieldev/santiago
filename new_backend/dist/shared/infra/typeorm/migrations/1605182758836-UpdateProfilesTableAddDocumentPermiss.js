"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class UpdateProfilesTableAddDocumentPermiss1605182758836 {
  async up(queryRunner) {
    await queryRunner.addColumn('profiles', new _typeorm.TableColumn({
      name: 'generate_documents_permiss',
      type: 'boolean',
      default: false
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('profiles', 'generate_documents_permiss');
  }

}

exports.default = UpdateProfilesTableAddDocumentPermiss1605182758836;