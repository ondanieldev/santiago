"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Relationship = _interopRequireDefault(require("../entities/Relationship"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RelationshipsRepository = (_dec = (0, _typeorm.EntityRepository)(_Relationship.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class RelationshipsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Relationship.default);
  }

  async create(data) {
    const relationship = this.ormRepository.create(data);
    this.ormRepository.save(relationship);
    return relationship;
  }

  async dangerouslyDelete(id) {
    await this.ormRepository.createQueryBuilder().delete().where('id = :id', {
      id
    }).execute();
  }

}, _temp)) || _class) || _class) || _class);
exports.default = RelationshipsRepository;