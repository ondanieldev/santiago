"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _formatFunctions = require("../../../../utils/formatFunctions");

var _IPDFProvider = _interopRequireDefault(require("../../PDFProvider/models/IPDFProvider"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DiskReceiptProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PDFProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPDFProvider.default === "undefined" ? Object : _IPDFProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DiskReceiptProvider {
  constructor(pdfProvider) {
    this.pdfProvider = pdfProvider;
  }

  async generate({
    client,
    items,
    operative,
    method
  }) {
    const date = (0, _dateFns.format)(new Date(), 'dd/MM/yy');
    const hour = (0, _dateFns.format)(new Date(), 'HH:mm');
    let totalValue = 0;
    const itemsArray = items.map(item => {
      const subtotal = item.quantity * item.true_value;
      totalValue += subtotal;
      return [(0, _formatFunctions.capitalize)(item.description.toString()), item.quantity.toString(), (0, _formatFunctions.formatCoinBRL)(item.base_value), item.is_compound_variation ? `${item.variation}p. a.m.` : `${item.variation}p.`, (0, _formatFunctions.formatCoinBRL)(subtotal)];
    });
    const itemsArrayCopy = items.map(item => {
      const subtotal = item.quantity * item.true_value;
      return [item.description.toString(), item.quantity.toString(), (0, _formatFunctions.formatCoinBRL)(item.base_value), item.is_compound_variation ? `${item.variation}p. a.m.` : `${item.variation}p.`, (0, _formatFunctions.formatCoinBRL)(subtotal)];
    });
    const itemsTable = {
      layout: 'noBorders',
      table: {
        body: [['Desc.', 'Qtd.', 'V.Un.', 'Var.', 'Subtotal'], ...itemsArray],
        widths: ['*', 40, 50, 40, '*']
      }
    };
    const itemsTableCopy = {
      layout: 'noBorders',
      table: {
        body: [['Desc.', 'Qtd.', 'V.Un.', 'Var.', 'Subtotal'], ...itemsArrayCopy],
        widths: ['*', 40, 50, 40, '*']
      }
    };
    const documentDefinition = {
      pageSize: 'A6',
      pageOrientation: 'portrait',
      pageMargins: [0, 0, 0, 0],
      info: {
        title: 'Recibo',
        author: 'Colégio Santiago',
        subject: 'Recibo',
        keywords: 'Recibo',
        creator: 'Colégio Santiago',
        producer: 'Colégio Santiago'
      },
      defaultStyle: {
        font: 'Bank',
        fontSize: 10,
        lineHeight: 1.25,
        alignment: 'center'
      },
      content: ['*******************************************', 'COLEGIO SANTIAGO', 'RUA RIO GRANDE DO SUL, 863', 'BAIRRO ESPIRITO SANTO - MG', '-------------------------------------------', {
        text: [{
          text: 'CEP: 32671-686 ',
          alignment: 'left'
        }, {
          text: 'TEL: (31) 3595-2156',
          alignment: 'right'
        }]
      }, {
        text: 'CNPJ: 09.293.734.110',
        alignment: 'left'
      }, {
        text: `RESPONSÁVEL FIN.: ${(0, _formatFunctions.capitalize)((0, _formatFunctions.returnFirstName)(client.name))}`,
        alignment: 'left'
      }, {
        text: `CPF: ${(0, _formatFunctions.returnCPFWithMask)(client.cpf)}`,
        alignment: 'left'
      }, '-------------------------------------------', {
        text: `RECEBIDO POR: ${(0, _formatFunctions.capitalize)((0, _formatFunctions.returnFirstName)(operative.name))}`,
        alignment: 'left'
      }, {
        columns: [{
          text: `DATA: ${date} `,
          alignment: 'left'
        }, {
          text: `HORA: ${hour}`,
          alignment: 'right'
        }]
      }, '==================DÉBITOS==================', itemsTable, '-------------------------------------------', {
        columns: [{
          text: 'Total do pagamento: ',
          alignment: 'left'
        }, {
          text: (0, _formatFunctions.formatCoinBRL)(totalValue),
          alignment: 'right'
        }]
      }, {
        columns: [{
          text: 'Forma de pagamento: ',
          alignment: 'left'
        }, {
          text: (0, _formatFunctions.formatPaymentMethod)(method),
          alignment: 'right'
        }]
      }, '===========================================', '* Este ticket não é documento fiscal *', 'Deus vos abençoe', '*******************************************', '*******************************************', 'COLEGIO SANTIAGO', 'RUA RIO GRANDE DO SUL, 863', 'BAIRRO ESPIRITO SANTO - MG', '-------------------------------------------', {
        text: [{
          text: 'CEP: 32671-686 ',
          alignment: 'left'
        }, {
          text: 'TEL: (31) 3595-2156',
          alignment: 'right'
        }]
      }, {
        text: 'CNPJ: 09.293.734.110',
        alignment: 'left'
      }, {
        text: `RESPONSÁVEL FIN.: ${(0, _formatFunctions.capitalize)((0, _formatFunctions.returnFirstName)(client.name))}`,
        alignment: 'left'
      }, {
        text: `CPF: ${(0, _formatFunctions.returnCPFWithMask)(client.cpf)}`,
        alignment: 'left'
      }, '-------------------------------------------', {
        text: `RECEBIDO POR: ${(0, _formatFunctions.capitalize)((0, _formatFunctions.returnFirstName)(operative.name))}`,
        alignment: 'left'
      }, {
        columns: [{
          text: `DATA: ${date} `,
          alignment: 'left'
        }, {
          text: `HORA: ${hour}`,
          alignment: 'right'
        }]
      }, '==================DÉBITOS==================', itemsTableCopy, '-------------------------------------------', {
        columns: [{
          text: 'Total do pagamento: ',
          alignment: 'left'
        }, {
          text: (0, _formatFunctions.formatCoinBRL)(totalValue),
          alignment: 'right'
        }]
      }, {
        columns: [{
          text: 'Forma de pagamento: ',
          alignment: 'left'
        }, {
          text: (0, _formatFunctions.formatPaymentMethod)(method),
          alignment: 'right'
        }]
      }, '===========================================', '* Este ticket não é documento fiscal *', 'Deus vos abençoe', '\n\n', 'Assinatura de baixa: ______________________', '*******************************************']
    };
    const filename = await this.pdfProvider.parse(documentDefinition);
    return filename;
  }

}) || _class) || _class) || _class) || _class);
exports.default = DiskReceiptProvider;