import * as Yup from 'yup';

export default Yup.object().shape({
  kinship: Yup.string().required('Parentesco obrigatório'),
  responsible_type: Yup.string()
    .matches(
      /(financial|supportive|school)/,
      () => 'Tipo de responsável inválido',
    )
    .required('Tipo de responsável obrigatório'),
});
