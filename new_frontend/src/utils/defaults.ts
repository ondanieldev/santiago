export const educationLevelOptions = [
  { value: '', label: 'Grau de instrução' },
  { value: 'elementary_incompleted', label: 'Fundamental incompleto' },
  { value: 'elementary_completed', label: 'Fundamental completo' },
  { value: 'highschool_incompleted', label: 'Segundo grau incompleto' },
  { value: 'highschool_completed', label: 'Segundo grau completo' },
  { value: 'university_incompleted', label: 'Superior incompleto' },
  { value: 'university_completed', label: 'Superior completo' },
];

export const genderOptions = [
  { value: '', label: 'Gênero' },
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Feminino' },
];

export const raceOptions = [
  { value: '', label: 'Raça' },
  { value: 'white', label: 'Branco' },
  { value: 'brown', label: 'Pardo' },
  { value: 'black', label: 'Negro' },
  { value: 'indigenous', label: 'Indígena' },
  { value: 'yellow', label: 'Amarelo' },
];

export const paymentMethods = [
  { value: '', label: 'Selecionar método de pagamento' },
  { value: 'creditCard', label: 'Cartão de crédito' },
  { value: 'debitCard', label: 'Cartão de débito' },
  { value: 'cash', label: 'Dinheiro' },
  { value: 'check', label: 'Cheque' },
  { value: 'deposit', label: 'Depósito' },
  { value: 'slip', label: 'Boleto' },
];

export const civilStateOptions = [
  { value: '', label: 'Selecionar estado civil' },
  { value: 'single', label: 'Solteiro(a)' },
  { value: 'married', label: 'Casado(a)' },
  { value: 'divorced', label: 'Divorciado(a)' },
  { value: 'widower', label: 'Viúvo(a)' },
  { value: 'separeted', label: 'Separado(a)' },
];

export const monthlyIncomeOptions = [
  { value: '', label: 'Selecionar renda mensal' },
  { value: 'a_class', label: 'Acima de R$ 11.262,00' },
  { value: 'b_class', label: 'Entre R$ 8.641,00 e R$ 11.261,00' },
  { value: 'c_class', label: 'Entre R$ 2.005,00 e R$ 8.640,00' },
  { value: 'd_class', label: 'Entre R$ 1.255,00 e R$ 2.004,00' },
  { value: 'e_class', label: 'Até R$ 1.254,00' },
];

export interface IOption {
  value: string;
  label: string;
}
