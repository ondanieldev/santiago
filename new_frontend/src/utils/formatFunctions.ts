import { format, parseISO } from 'date-fns';

export function formatCoin(value: number | string): string {
  const parsedValue = Number(value);
  return `R$ ${parsedValue.toFixed(2).toString().replace('.', ',')}`;
}

export function formatDate(date: Date): string {
  return format(parseISO(date.toString()), 'yyyy-MM-dd');
}

export function prettyDate(date: Date): string {
  return format(parseISO(date.toString()), 'dd/MM/yyyy');
}

export function formatEducationLevel(educationLevel: string): string {
  switch (educationLevel) {
    case 'elementary_incompleted':
      return 'Fundamental incompleto';

    case 'elementary_completed':
      return 'Fundamental completo';

    case 'highschool_incompleted':
      return 'Segundo grau incompleto';

    case 'highschool_completed':
      return 'Segundo grau completo';

    case 'university_incompleted':
      return 'Superior incompleto';

    case 'university_completed':
      return 'Superior completo';
    default:
      return '';
  }
}

export function formatGender(gender: string): string {
  switch (gender) {
    case 'male':
      return 'Masculino';

    case 'female':
      return 'Feminino';

    default:
      return '';
  }
}

export function formatRace(race: string): string {
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
      return '';
  }
}

export function formatPaymentMethod(method: string): string {
  switch (method) {
    case 'creditCard':
      return 'Cartão de crédito';
    case 'debitCard':
      return 'Cartão de débito';
    case 'cash':
      return 'Dinheiro';
    case 'check':
      return 'Cheque';
    case 'deposit':
      return 'Depósito';
    case 'slip':
      return 'Boleto';
    default:
      return '-';
  }
}

export function formatCivilState(civil_state: string): string {
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

export function formatMonthlyIncome(monthly_income: string): string {
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

export function formatContractStatus(status: string): string {
  switch (status) {
    case 'underAnalysis':
      return 'Em análise';
    case 'pendent':
      return 'Pendente';
    case 'accepted':
      return 'Aceito';
    case 'active':
      return 'Ativo';
    default:
      return '-';
  }
}
