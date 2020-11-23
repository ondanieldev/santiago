"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Relationship = _interopRequireDefault(require("../../infra/typeorm/entities/Relationship"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RelationshipsRepository {
  constructor() {
    this.relationships = [];
  }

  async create(data) {
    const relationship = new _Relationship.default();
    Object.assign(relationship, {
      id: (0, _uuid.v4)()
    }, data);
    this.relationships.push(relationship);
    return relationship;
  }

  async dangerouslyDelete(id) {
    this.relationships.filter(relationship => relationship.id !== id);
  }

}

exports.default = RelationshipsRepository;