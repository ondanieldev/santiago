interface IItem {
    description: string;
    quantity: number;
    value: number;
    variation: number;
}

interface IClient {
    name: string;
    cpf: string;
}

interface IOperative {
    name: string;
}

export default interface IGenerateReceiptDTO {
    client: IClient;
    operative: IOperative;
    items: IItem[];
    method: 'creditCard' | 'debitCard' | 'cash' | 'check' | 'deposit' | 'slip';
}
