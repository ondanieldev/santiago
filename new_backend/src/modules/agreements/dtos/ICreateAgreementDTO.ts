export default interface ICreateAgreementDTO {
    responsible_type: 'financial' | 'supportive' | 'educational';
    person_id: string;
    contract_id: string;
}
