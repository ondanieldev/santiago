export default interface IPerson {
  id: string;
  name: string;
  birth_date: Date;
  nacionality: string;
  civil_state: string;
  profission: string;
  cpf: string;
  rg: string;
  address_street: string;
  address_number: string;
  address_complement?: string;
  address_neighborhood: string;
  address_city: string;
  address_cep: string;
  residencial_phone: string;
  commercial_phone: string;
  personal_phone: string;
  education_level: string;
  workplace: string;
  monthly_income: number;
  income_tax: boolean;
  email: string;
  rg_photo?: string;
  cpf_photo?: string;
  residencial_proof_photo?: string;
}
