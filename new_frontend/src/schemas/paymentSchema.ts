import * as Yup from 'yup';

export default Yup.object().shape({
  method: Yup.string()
    .matches(
      /(creditCard|debitCard|cash|check|deposit|slip)/,
      () => 'Método de pagamento inválido',
    )
    .required('Método de pagamento obrigatório'),
});
