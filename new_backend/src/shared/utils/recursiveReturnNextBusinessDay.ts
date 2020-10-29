import { isWeekend, addDays, isEqual } from 'date-fns';

interface IHoliday {
    date: string;
    name: string;
    link: string;
    type: string;
    description: string;
    type_code: string;
}

export default async function recursiveReturnNextBusinessDay(
    date: Date,
    holidays: IHoliday[],
): Promise<Date> {
    try {
        if (isWeekend(date)) {
            return await recursiveReturnNextBusinessDay(
                addDays(date, 1),
                holidays,
            );
        }

        for (const holiday of holidays) {
            const [day, month, year] = holiday.date.split('/');

            if (
                isEqual(
                    new Date(Number(year), Number(month) - 1, Number(day)),
                    date,
                )
            ) {
                return await recursiveReturnNextBusinessDay(
                    addDays(date, 1),
                    holidays,
                );
            }
        }
    } catch {}

    return date;
}
