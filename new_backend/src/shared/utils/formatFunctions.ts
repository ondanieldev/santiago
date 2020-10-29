export function returnFirstName(name: string): string {
    return name.split(' ')[0];
}

export function returnCPFWithMask(cpf: string): string {
    const d = cpf.split('');

    if (d.length !== 11) {
        return cpf;
    }

    return `${d[0]}${d[1]}${d[2]}.${d[3]}${d[4]}${d[5]}.${d[6]}${d[7]}${d[8]}-${d[9]}${d[10]}`;
}

export function formatPaymentMethod(
    method: 'creditCard' | 'debitCard' | 'cash' | 'check' | 'deposit' | 'slip',
): string {
    switch (method) {
        case 'creditCard':
            return 'Cartão de crédito';
            break;
        case 'debitCard':
            return 'Cartão de débito';
            break;
        case 'cash':
            return 'Dinheiro';
            break;
        case 'check':
            return 'Cheque';
            break;
        case 'deposit':
            return 'Depósito';
            break;
        case 'slip':
            return 'Boleto';
            break;
        default:
            return '';
            break;
    }
}
