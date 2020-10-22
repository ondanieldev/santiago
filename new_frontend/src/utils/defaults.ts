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

export interface IOption {
  value: string;
  label: string;
}
