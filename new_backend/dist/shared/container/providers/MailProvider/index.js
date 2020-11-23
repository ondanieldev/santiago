"use strict";

var _tsyringe = require("tsyringe");

var _mail = _interopRequireDefault(require("../../../../config/mail"));

var _EtherealMailProvider = _interopRequireDefault(require("./implementations/EtherealMailProvider"));

var _AmazonSESMailProvider = _interopRequireDefault(require("./implementations/AmazonSESMailProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.default),
  ses: _tsyringe.container.resolve(_AmazonSESMailProvider.default)
};

_tsyringe.container.registerInstance('MailProvider', providers[_mail.default.driver]);