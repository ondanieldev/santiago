"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = capitalize;
exports.returnFirstName = returnFirstName;
exports.returnCPFWithMask = returnCPFWithMask;
exports.returnCEPWithMask = returnCEPWithMask;
exports.returnRGWithMask = returnRGWithMask;
exports.returnYesOrNoFromBool = returnYesOrNoFromBool;
exports.formatPaymentMethod = formatPaymentMethod;
exports.formatEducationLevel = formatEducationLevel;
exports.formatGender = formatGender;
exports.formatRace = formatRace;
exports.formatMonthlyIncome = formatMonthlyIncome;
exports.formatCivilSate = formatCivilSate;
exports.formatCoinBRL = formatCoinBRL;
exports.formatDateBrazil = formatDateBrazil;
exports.formatMonthBrazil = formatMonthBrazil;
exports.prettierPerson = prettierPerson;
exports.prettierStudent = prettierStudent;
exports.prettierGrade = prettierGrade;

var _dateFns = require("date-fns");

function capitalize(str) {
  if (typeof str === 'string') {
    return str.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  }

  return '';
}

function returnFirstName(name) {
  return name.split(' ')[0];
}

function returnCPFWithMask(cpf) {
  const d = cpf.split('');

  if (d.length !== 11) {
    return cpf;
  }

  return `${d[0]}${d[1]}${d[2]}.${d[3]}${d[4]}${d[5]}.${d[6]}${d[7]}${d[8]}-${d[9]}${d[10]}`;
}

function returnCEPWithMask(cep) {
  if (cep.length === 8) {
    return `${cep[0]}${cep[1]}${cep[2]}${cep[3]}${cep[4]}-${cep[5]}${cep[6]}${cep[7]}`;
  }

  return cep;
}

function returnRGWithMask(rg) {
  const lettersArray = rg.match(/[a-zA-Z]/g);
  const numbersArray = rg.match(/[0-9]/g);

  if (lettersArray && numbersArray) {
    return `${lettersArray.join().toUpperCase()}-${numbersArray.join()}`;
  }

  return rg;
}

function returnYesOrNoFromBool(bool) {
  return bool ? 'Sim' : 'Não';
}

function formatPaymentMethod(method) {
  switch (method) {
    case 'creditCard':
      return 'Cartão de crédito';
      break;

    case 'debitCard':
      return 'Cartão de débito';
      break;

    case 'cash':
      return 'Dinheiro';
      break;

    case 'check':
      return 'Cheque';
      break;

    case 'deposit':
      return 'Depósito';
      break;

    case 'slip':
      return 'Boleto';
      break;

    default:
      return '';
      break;
  }
}

function formatEducationLevel(educationLevel) {
  switch (educationLevel) {
    case 'elementary_incompleted':
      return 'Fundamental Incompleto';

    case 'elementary_completed':
      return 'Fundamental Completo';

    case 'highschool_incompleted':
      return 'Segundo Grau Incompleto';

    case 'highschool_completed':
      return 'Segundo Grau Completo';

    case 'university_incompleted':
      return 'Superior Incompleto';

    case 'university_completed':
      return 'Superior Completo';

    default:
      return '-';
  }
}

function formatGender(gender) {
  switch (gender) {
    case 'male':
      return 'Masculino';

    case 'female':
      return 'Feminino';

    default:
      return '-';
  }
}

function formatRace(race) {
  switch (race) {
    case 'white':
      return 'Branco';

    case 'brown':
      return 'Pardo';

    case 'black':
      return 'Negro';

    case 'indigenous':
      return 'Indígena';

    case 'yellow':
      return 'Amarelo';

    default:
      return '-';
  }
}

function formatMonthlyIncome(monthly_income) {
  switch (monthly_income) {
    case 'a_class':
      return 'Acima de 20 salários mínimos';

    case 'b_class':
      return 'Entre 10 e 20 salários mínimos';

    case 'c_class':
      return 'Entre 4 e 10 salários mínimos';

    case 'd_class':
      return 'Entre 2 e 4 salários mínimos';

    case 'e_class':
      return 'Até 2 salários mínimos';

    default:
      return '-';
  }
}

function formatCivilSate(civil_state) {
  switch (civil_state) {
    case 'single':
      return 'Solteiro(a)';

    case 'married':
      return 'Casado(a)';

    case 'divorced':
      return 'Divorciado(a)';

    case 'widower':
      return 'Viúvo(a)';

    case 'separeted':
      return 'Separado(a)';

    default:
      return '-';
  }
}

function formatCoinBRL(value) {
  return `R$ ${Number(value).toFixed(2).toString().replace('.', ',')}`;
}

function formatDateBrazil(date) {
  return (0, _dateFns.format)((0, _dateFns.parseISO)(date.toString()), 'dd/MM/yyyy');
}

function formatMonthBrazil(englishMonth) {
  switch (englishMonth) {
    case 'January':
      return 'JANEIRO';

    case 'February':
      return 'FEVEREIRO';

    case 'March':
      return 'MARÇO';

    case 'April':
      return 'ABRIL';

    case 'May':
      return 'MAIO';

    case 'June':
      return 'JUNHO';

    case 'July':
      return 'JULHO';

    case 'August':
      return 'AGOSTO';

    case 'September':
      return 'SETEMBRO';

    case 'October':
      return 'OUTUBRO';

    case 'November':
      return 'NOVEMBRO';

    case 'December':
      return 'DEZEMBRO';

    default:
      return ' ';
  }
}

function prettierPerson(person) {
  const personData = {};
  personData.address_cep = returnCEPWithMask(person.address_cep);
  personData.address_city = capitalize(person.address_city);
  personData.address_complement = capitalize(person.address_complement);
  personData.address_neighborhood = capitalize(person.address_neighborhood);
  personData.address_number = person.address_number.toString();
  personData.address_street = capitalize(person.address_street);
  personData.birth_date = formatDateBrazil(person.birth_date);
  personData.civil_state = formatCivilSate(person.civil_state);
  personData.commercial_phone = person.commercial_phone.toString();
  personData.cpf = returnCPFWithMask(person.cpf);
  personData.education_level = formatEducationLevel(person.education_level);
  personData.email = person.email.toLowerCase();
  personData.income_tax = returnYesOrNoFromBool(person.income_tax);
  personData.monthly_income = formatMonthlyIncome(person.monthly_income);
  personData.nacionality = capitalize(person.nacionality);
  personData.name = capitalize(person.name);
  personData.personal_phone = person.personal_phone.toString();
  personData.profission = capitalize(person.profission);
  personData.residencial_phone = person.residencial_phone.toString();
  personData.rg = returnRGWithMask(person.rg);
  personData.workplace = capitalize(person.nacionality);
  return personData;
}

function prettierStudent(student) {
  const studentData = {};
  studentData.birth_city = capitalize(student.birth_city);
  studentData.birth_date = formatDateBrazil(student.birth_date);
  studentData.birth_state = student.birth_state.toUpperCase();
  studentData.ease_relating = returnYesOrNoFromBool(student.ease_relating);
  studentData.father_name = capitalize(student.father_name);
  studentData.food_alergy = capitalize(student.food_alergy);
  studentData.gender = formatGender(student.gender);
  studentData.health_plan = capitalize(student.health_plan);
  studentData.health_problem = capitalize(student.health_problem);
  studentData.medication_alergy = capitalize(student.medication_alergy);
  studentData.mother_name = capitalize(student.mother_name);
  studentData.nacionality = capitalize(student.nacionality);
  studentData.name = capitalize(student.name);
  studentData.origin_school = capitalize(student.origin_school);
  studentData.race = formatRace(student.race);
  studentData.special_necessities = capitalize(student.special_necessities);
  return studentData;
}

function prettierGrade(grade) {
  const gradeData = {};
  gradeData.name = capitalize(grade.name);
  gradeData.value = formatCoinBRL(grade.value);
  gradeData.total_value = formatCoinBRL(grade.value * 12);
  gradeData.year = grade.year.toString();
  return gradeData;
}