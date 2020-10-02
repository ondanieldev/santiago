import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  new_enrollment_permiss: Yup.bool().required('Permissão obrigatória'),
  validate_enrollment_permiss: Yup.bool().required('Permissão obrigatória'),
  pay_debit_permiss: Yup.bool().required('Permissão obrigatória'),
  discharge_payment_permiss: Yup.bool().required('Permissão obrigatória'),
  crud_profiles_permiss: Yup.bool().required('Permissão obrigatória'),
  crud_users_permiss: Yup.bool().required('Permissão obrigatória'),
  crud_grades_permiss: Yup.bool().required('Permissão obrigatória'),
});
