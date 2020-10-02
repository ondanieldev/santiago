import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  year: Yup.string().required('Ano obrigatória'),
  value: Yup.number().typeError('Valor inválido').required('Valor obrigatória'),
});
