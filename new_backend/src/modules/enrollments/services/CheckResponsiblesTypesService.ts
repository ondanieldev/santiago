import AppError from '@shared/errors/AppError';
import IResponsibles from '@modules/enrollments/dtos/IResponsiblesDTO';

export default class CheckResponsiblesTypesService {
    public execute(responsibles: IResponsibles[]): void {
        const types: ('financial' | 'supportive' | 'educational')[] = [];

        responsibles.forEach(responsible => {
            types.push(responsible.responsible_type);
        });

        let isRepeated = false;
        let hasFinancial = false;
        let hasSupportive = false;

        types.sort().forEach((type, i, arr) => {
            if (type === 'financial') hasFinancial = true;
            else if (type === 'supportive') hasSupportive = true;
            if (
                arr[i - 1] &&
                arr[i - 1] === type &&
                (type === 'financial' || type === 'supportive')
            )
                isRepeated = true;
        });

        if (!hasFinancial || !hasSupportive) {
            throw new AppError(
                'Deve haver um responsável financeiro e um solidário',
            );
        } else if (isRepeated) {
            throw new AppError(
                'Só pode haver um responsável financeiro e um solidário',
            );
        }
    }
}
