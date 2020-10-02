import * as Yup from 'yup';

export default Yup.object().shape({
  username: Yup.string().required('Usuário obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
  profile_id: Yup.string().required('Perfil obrigatório'),
});
