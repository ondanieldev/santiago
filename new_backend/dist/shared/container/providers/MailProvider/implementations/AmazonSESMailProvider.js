"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ses = _interopRequireDefault(require("aws-sdk/clients/ses"));

var _mail = _interopRequireDefault(require("../../../../../config/mail"));

var _IMailTemplateProvider = _interopRequireDefault(require("../../MailTemplateProvider/models/IMailTemplateProvider"));

var _dec, _dec2, _dec3, _dec4, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AmazonSESMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('MailTemplateProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IMailTemplateProvider.default === "undefined" ? Object : _IMailTemplateProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_temp = class AmazonSESMailProvider {
  constructor(mailTemplateProvider) {
    this.mailTemplateProvider = mailTemplateProvider;
    this.sesClient = void 0;
    this.sesClient = new _ses.default({
      region: _mail.default.config.ses.region
    });
  }

  async sendMail({
    body,
    subject,
    to,
    from
  }) {
    try {
      await this.sesClient.sendEmail({
        Source: `${from?.name || _mail.default.defaults.from.name} <${from?.email || _mail.default.defaults.from.email}>`,
        Destination: {
          ToAddresses: [`${to.name} <${to.email}>`]
        },
        Message: {
          Subject: {
            Data: subject
          },
          Body: {
            Html: {
              Data: await this.mailTemplateProvider.parse(body)
            }
          }
        }
      }).promise();
    } catch {}
  }

}, _temp)) || _class) || _class) || _class) || _class);
var _default = AmazonSESMailProvider;
exports.default = _default;