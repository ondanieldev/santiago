import { parseISO, format as dateFnsFormatDate } from 'date-fns';
import Person from '@modules/persons/infra/typeorm/entities/Person';
import IPrettierPersonDTO from '@modules/persons/dtos/IPrettierPersonDTO';
import IPrettierStudentDTO from '@modules/students/dtos/IPrettierStudentDTO';
import IPrettierGradeDTO from '@modules/grades/dtos/IPrettierGradeDTO';
import Student from '@modules/students/infra/typeorm/entities/Student';
import Grade from '@modules/grades/infra/typeorm/entities/Grade';

export function capitalize(str: string | undefined): string {
    if (typeof str === 'string') {
        return str
            .toLowerCase()
            .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    }

    return '';
}

export function returnFirstName(name: string): string {
    return name.split(' ')[0];
}

export function returnCPFWithMask(cpf: string): string {
    const d = cpf.split('');

    if (d.length !== 11) {
        return cpf;
    }

    return `${d[0]}${d[1]}${d[2]}.${d[3]}${d[4]}${d[5]}.${d[6]}${d[7]}${d[8]}-${d[9]}${d[10]}`;
}

export function returnCEPWithMask(cep: string): string {
    if (cep.length === 8) {
        return `${cep[0]}${cep[1]}${cep[2]}${cep[3]}${cep[4]}-${cep[5]}${cep[6]}${cep[7]}`;
    }

    return cep;
}

export function returnRGWithMask(rg: string): string {
    const lettersArray = rg.match(/[a-zA-Z]/g);
    const numbersArray = rg.match(/[0-9]/g);

    if (lettersArray && numbersArray) {
        return `${lettersArray.join().toUpperCase()}-${numbersArray.join()}`;
    }

    return rg;
}

export function returnYesOrNoFromBool(bool: boolean): 'Sim' | 'Não' {
    return bool ? 'Sim' : 'Não';
}

export function formatPaymentMethod(
    method: 'creditCard' | 'debitCard' | 'cash' | 'check' | 'deposit' | 'slip',
): string {
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

export function formatEducationLevel(
    educationLevel:
        | 'elementary_incompleted'
        | 'elementary_completed'
        | 'highschool_incompleted'
        | 'highschool_completed'
        | 'university_incompleted'
        | 'university_completed',
): string {
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

export function formatGender(gender: 'male' | 'female'): string {
    switch (gender) {
        case 'male':
            return 'Masculino';
        case 'female':
            return 'Feminino';
        default:
            return '-';
    }
}

export function formatRace(
    race: 'white' | 'brown' | 'black' | 'indigenous' | 'yellow',
): string {
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

export function formatMonthlyIncome(
    monthly_income: 'a_class' | 'b_class' | 'c_class' | 'd_class' | 'e_class',
): string {
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

export function formatCivilSate(
    civil_state: 'single' | 'married' | 'divorced' | 'widower' | 'separeted',
): string {
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

export function formatCoinBRL(value: number): string {
    return `R$ ${Number(value).toFixed(2).toString().replace('.', ',')}`;
}

export function formatDateBrazil(date: Date | string): string {
    return dateFnsFormatDate(parseISO(date.toString()), 'dd/MM/yyyy');
}

export function formatMonthBrazil(englishMonth: string): string {
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

export function prettierPerson(person: Person): IPrettierPersonDTO {
    const personData = {} as IPrettierPersonDTO;

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

export function prettierStudent(student: Student): IPrettierStudentDTO {
    const studentData = {} as IPrettierStudentDTO;

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

export function prettierGrade(grade: Grade): IPrettierGradeDTO {
    const gradeData = {} as IPrettierGradeDTO;

    gradeData.name = capitalize(grade.name);
    gradeData.value = formatCoinBRL(grade.value);
    gradeData.total_value = formatCoinBRL(grade.value * 12);
    gradeData.year = grade.year.toString();

    return gradeData;
}
