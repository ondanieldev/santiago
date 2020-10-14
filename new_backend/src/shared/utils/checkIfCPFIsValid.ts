export default function checkIfCpfIsValid(cpf: string): boolean {
    const chars = cpf.toString().split('');

    if (
        cpf !== '11111111111' &&
        cpf !== '22222222222' &&
        cpf !== '33333333333' &&
        cpf !== '44444444444' &&
        cpf !== '55555555555' &&
        cpf !== '66666666666' &&
        cpf !== '77777777777' &&
        cpf !== '88888888888' &&
        cpf !== '99999999999' &&
        chars.length === 11
    ) {
        const digits = chars.map(char => parseInt(char, 10));

        const getCpfSum = (initial: number) => {
            const cpfSum = digits.reduce((sum, digit, index) => {
                const mult = initial - index;

                if (mult >= 2) {
                    return sum + digit * mult;
                }

                return sum;
            }, 0);

            return (cpfSum * 10) % 11;
        };

        const firstDigit = getCpfSum(10) === 10 ? 0 : getCpfSum(10);

        const secondDigit = getCpfSum(11) === 10 ? 0 : getCpfSum(11);

        if (digits[9] === firstDigit && digits[10] === secondDigit) {
            return true;
        }
    }

    return false;
}
