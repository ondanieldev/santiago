import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  birth_date: Yup.date()
    .typeError('Data de aniversário inválida')
    .required('Data de nascimento obrigatória'),
  nacionality: Yup.string().required('Nacionalidade obrigatória'),
  civil_state: Yup.string().required('Estado civil obrigatório'),
  profission: Yup.string().required('Profissão obrigatória'),
  cpf: Yup.string().required('CPF obrigatório'),
  rg: Yup.string().required('RG obrigatório'),
  address_street: Yup.string().required('Rua obrigatória'),
  address_number: Yup.number().required('Número obrigatório'),
  address_complement: Yup.string(),
  address_neighborhood: Yup.string().required('Bairro obrigatório'),
  address_city: Yup.string().required('Cidade obrigatória'),
  address_cep: Yup.string().required('CEP obrigatório'),
  residencial_phone: Yup.string().required('Telefone residencial obrigatório'),
  commercial_phone: Yup.string().required('Telefone comercial obrigatório'),
  personal_phone: Yup.string().required('Telefone pessoal obrigatório'),
  education_level: Yup.string().matches(
    /(elementary_incompleted|elementary_completed|highschool_incompleted|highschool_completed|university_incompleted|university_completed)/,
  ),
  workplace: Yup.string().required('Local de trabalho obrigatório'),
  monthly_income: Yup.number()
    .typeError('Renda mensal inválida')
    .required('Renda mensal obrigatória'),
  income_tax: Yup.string().matches(
    /(yes|no)/,
    () => 'Declaração de imposto de renda inválida',
  ),
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  kinship: Yup.string().required('Parentesco obrigatório'),
});
