import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('Nome não informado'),
  father_name: Yup.string().required('Nome do pai não informado'),
  mother_name: Yup.string().required('Nome da mãe não informado'),
  birth_date: Yup.date()
    .typeError('Data de aniversário inválida')
    .required('Data de aniversário informada'),
  nacionality: Yup.string().required('Nacionalidade não informada'),
  birth_city: Yup.string().required('Cidade natal não informada'),
  birth_state: Yup.string().required('Estado natal não informado'),
  gender: Yup.string().matches(/(male|female)/, () => 'Gênero inválido'),
  race: Yup.string().matches(
    /(white|brown|black|indigenous|yellow)/,
    () => 'Raça inválida',
  ),
  ease_relating: Yup.boolean().required(
    'Facilidade em se relacionar não informada',
  ),
  origin_school: Yup.string(),
  healt_plan: Yup.string(),
  food_alergy: Yup.string(),
  medication_alergy: Yup.string(),
  health_problem: Yup.string(),
  special_necessities: Yup.string(),
});
