import AppError from '@shared/errors/AppError';
import ICreatePersonDTO from '@modules/persons/dtos/ICreatePersonDTO';

export default class CheckResponsiblesUniqueValuesService {
    private checkIfCpfIsValid(cpf: string): boolean {
        const digits = cpf.toString().split('');

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
            digits.length === 11
        ) {
            const parsedDigits = digits.map(digit => parseInt(digit, 10));

            const sum = (initial: number) => {
                return (
                    (parsedDigits.reduce((sum2, digit, index) => {
                        const mult = initial - index;
                        if (mult >= 2) return sum2 + digit * mult;
                        return sum2;
                    }, 0) *
                        10) %
                    11
                );
            };

            const firstDigit = sum(10) === 10 ? 0 : sum(10);
            const secondDigit = sum(11) === 10 ? 0 : sum(11);
            if (
                parsedDigits[9] === firstDigit &&
                parsedDigits[10] === secondDigit
            )
                return true;
        }
        return false;
    }

    public execute(responsibles: ICreatePersonDTO[]): void {
        responsibles.forEach(responsible => {
            if (!this.checkIfCpfIsValid(responsible.cpf)) {
                throw new AppError('CPF inválido');
            }

            const isRepeated = responsibles.some((responsible2, i2) => {
                return (
                    (responsible2.cpf === responsible.cpf ||
                        responsible2.rg === responsible.rg ||
                        responsible2.email === responsible.email) &&
                    responsibles.indexOf(responsible) !== i2
                );
            });

            if (isRepeated) {
                throw new AppError('CPF, RG e e-mail precisam ser únicos');
            }
        });
    }
}
