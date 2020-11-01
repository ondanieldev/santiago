interface IItem {
    description: string;
    quantity: number;
    base_value: number;
    variation: number;
    true_value: number;
    is_compound_variation?: boolean;
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
