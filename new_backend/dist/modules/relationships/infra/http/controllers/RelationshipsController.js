"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateRelationshipService = _interopRequireDefault(require("../../../services/CreateRelationshipService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RelationshipsController {
  async create(request, response) {
    const {
      kinship,
      person_id,
      student_id
    } = request.body;

    const createRelationship = _tsyringe.container.resolve(_CreateRelationshipService.default);

    const relationship = await createRelationship.execute({
      kinship,
      person_id,
      student_id
    });
    return response.json(relationship);
  }

}

exports.default = RelationshipsController;