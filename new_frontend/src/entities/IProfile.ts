export default interface IProfile {
  id: string;
  name: string;
  new_enrollment_permiss: boolean;
  validate_enrollment_permiss: boolean;
  pay_debit_permiss: boolean;
  discharge_payment_permiss: boolean;
  crud_profiles_permiss: boolean;
  crud_users_permiss: boolean;
  crud_grades_permiss: boolean;
  create_extra_debit_permiss: boolean;
}
