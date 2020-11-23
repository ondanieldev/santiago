"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _path = _interopRequireDefault(require("path"));

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _formatFunctions = require("../../../shared/utils/formatFunctions");

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _IPDFProvider = _interopRequireDefault(require("../../../shared/container/providers/PDFProvider/models/IPDFProvider"));

var _IContractsRepository = _interopRequireDefault(require("../repositories/IContractsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let GenerateChecklistPDFService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PDFProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default, typeof _IPDFProvider.default === "undefined" ? Object : _IPDFProvider.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class GenerateChecklistPDFService {
  constructor(contractsRepository, pdfProvider, storageProvider) {
    this.contractsRepository = contractsRepository;
    this.pdfProvider = pdfProvider;
    this.storageProvider = storageProvider;
  }

  async execute(contract_id) {
    const contract = await this.contractsRepository.findById(contract_id);

    if (!contract) {
      throw new _AppError.default('o contrato selecionado não existe!');
    }

    const financialResponsible = (0, _formatFunctions.prettierPerson)(contract.agreements[0].person);
    const supportiveResponsible = (0, _formatFunctions.prettierPerson)(contract.agreements[1].person);
    const student = (0, _formatFunctions.prettierStudent)(contract.student);
    const grade = (0, _formatFunctions.prettierGrade)(contract.grade);

    const imageLogo = _path.default.resolve(__dirname, '..', '..', '..', 'assets', 'images', 'logo.png');

    const documentDefinition = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [20, 20, 20, 20],
      info: {
        title: 'Checklist de Documentos',
        author: 'Colégio Santiago',
        subject: 'Checklist de Documentos',
        keywords: 'Checklist, Documentos',
        creator: 'Colégio Santiago',
        producer: 'Colégio Santiago'
      },
      styles: {
        heading: {
          fontSize: 12,
          bold: true,
          alignment: 'center'
        },
        subheading: {
          fontSize: 10,
          bold: true
        }
      },
      defaultStyle: {
        font: 'Arial',
        fontSize: 10,
        lineHeight: 1.25,
        alignment: 'justify'
      },
      content: [{
        columns: [{
          image: imageLogo,
          width: 65,
          alignment: 'center'
        }, {
          text: [{
            text: `Checklist de Documentos de Matrícula/Rematrícula - Ano ${grade.year}`,
            style: 'heading'
          }, {
            text: `\nDocumento Emitido em ${(0, _dateFns.format)(new Date(), 'dd/MM/yyyy')}`,
            style: 'subheading',
            alignment: 'center'
          }]
        }, {
          text: '',
          width: 65
        }]
      }, {
        text: '\nIdentificação do Aluno',
        style: 'subheading'
      }, // ALUNO
      {
        columns: [`Nome: ${student.name}`, {
          text: `Turma: ${grade.name}`,
          alignment: 'right'
        }]
      }, {
        columns: [`Data de Nascimento: ${student.birth_date}`, {
          text: `Naturalidade: ${student.birth_city}`,
          alignment: 'center',
          width: '*'
        }, {
          text: `UF: ${student.birth_state}`,
          alignment: 'right'
        }]
      }, {
        columns: [`Nacionalidade: ${student.nacionality}`, {
          text: `Sexo: ${student.gender}`,
          alignment: 'center',
          width: '*'
        }, {
          text: `Cor/Raça: ${student.race}`,
          alignment: 'right'
        }]
      }, // RESPONSÁVEL FINANCEIRO
      {
        text: '\nResponsável Financeiro',
        style: 'subheading'
      }, `Nome: ${financialResponsible.name}`, `E-mail: ${financialResponsible.email}`, `CEP: ${financialResponsible.address_cep}`, `Endereço: Rua ${financialResponsible.address_street} - Número ${financialResponsible.address_number} ${financialResponsible.address_complement} - Bairro ${financialResponsible.address_neighborhood} - Cidade ${financialResponsible.address_city}`, {
        columns: [`RG: ${financialResponsible.rg}`, {
          text: `CPF: ${financialResponsible.cpf}`,
          alignment: 'right'
        }]
      }, {
        columns: [`Aniversário: ${financialResponsible.birth_date}`, {
          text: `Grau de Instrução: ${financialResponsible.education_level}`,
          alignment: 'right'
        }]
      }, {
        columns: [`Profissão: ${financialResponsible.profission}`, {
          text: `Telefone Comercial: ${financialResponsible.commercial_phone}`,
          alignment: 'right'
        }]
      }, {
        columns: [`Telefone Fixo: ${financialResponsible.residencial_phone}`, {
          text: `Telefone Celular: ${financialResponsible.personal_phone}`,
          alignment: 'right'
        }]
      }, // RESPONSÁVEL SOLIDÁRIO
      {
        text: '\nResponsável Solidário',
        style: 'subheading'
      }, `Nome: ${supportiveResponsible.name}`, `E-mail: ${supportiveResponsible.email}`, {
        columns: [`RG: ${supportiveResponsible.rg}`, {
          text: `CPF: ${supportiveResponsible.cpf}`,
          alignment: 'right'
        }]
      }, {
        columns: [`Aniversário: ${supportiveResponsible.birth_date}`, {
          text: `Grau de Instrução: ${supportiveResponsible.education_level}`,
          alignment: 'center',
          width: '*'
        }, {
          text: `Profissão: ${supportiveResponsible.profission}`,
          alignment: 'right'
        }]
      }, // Checklist
      {
        columns: [{
          text: `\n\n\n02 fotos 3x4\n
                            CPF pai (  ) mãe (  )\n
                            RG  pai (  ) mãe (  )\n
                            Histórico escolar\n
                            Cartão de vacina\n
                            Carteira de plano de saúde\n
                            Comprovante de residência\n
                            Certidão de nascimento do aluno\n
                            Declaração de transferência escolar\n
                            Declaração de quitação de débito da escola de origem\n
                            Laudo — Aluno com Deficiência/Necesidades Especiais\n
                            Relatório — Aluno com Deficiência/Necesidades Especiais\n\n\n`,
          width: 'auto'
        }, {
          width: '*',
          alignment: 'right',
          text: `\n\n\nAssinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n
                            Assinatura: __________ Data: ____/____ Hora: ____:____\n\n\n`
        }]
      }, {
        columns: ['______________________________\nSECRETARIA', '______________________________\nDIREÇÃO', '______________________________\nATENDENTE'],
        alignment: 'center'
      }]
    };
    const fileName = await this.pdfProvider.parse(documentDefinition);
    await this.storageProvider.saveFile(fileName);

    if (contract.checklist_document) {
      await this.storageProvider.deleteFile(contract.checklist_document);
    }

    Object.assign(contract, {
      checklist_document: fileName
    });
    await this.contractsRepository.save(contract);
    return contract;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = GenerateChecklistPDFService;
exports.default = _default;