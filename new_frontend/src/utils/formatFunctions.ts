export const formatDate = (date: Date): string => {
  const d = new Date(date);

  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('-');
};

export const prettyDate = (date: Date): string => {
  const d = new Date(date);

  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  return [day, month, year].join('/');
};

export const formatEducationLevel = (educationLevel: string): string => {
  switch (educationLevel) {
    case 'elementary_incompleted':
      return 'Fundamental incompleto';

    case 'elementary_completed':
      return 'Fundamental completo';

    case 'highschool_incompleted':
      return 'Segundo grau incompleto';

    case 'highschool_completed':
      return 'Segundo grau completo';

    case 'university_incompleted':
      return 'Superior incompleto';

    case 'university_completed':
      return 'Superior completo';
    default:
      return '';
  }
};

export const formatGender = (gender: string): string => {
  switch (gender) {
    case 'male':
      return 'Masculino';

    case 'female':
      return 'Feminino';

    default:
      return '';
  }
};

export const formatRace = (race: string): string => {
  switch (race) {
    case 'white':
      return 'Branco';

    case 'brown':
      return 'Pardo';

    case 'black':
      return 'Negro';

    case 'indigenous':
      return 'Indígena';

    case 'yellow':
      return 'Amarelo';

    default:
      return '';
  }
};

export function formatGrade(
  grade:
    | 'maternal'
    | 'first_period'
    | 'second_period'
    | 'first_year'
    | 'second_year'
    | 'third_year'
    | 'fourth_year'
    | 'fifth_year'
    | 'sixth_year'
    | 'seventh_year'
    | 'eighth_year'
    | 'nineth_year',
): string {
  switch (grade) {
    case 'maternal':
      return 'Maternal';

    case 'first_period':
      return 'Primeiro Período';

    case 'second_period':
      return 'Segundo Período';

    case 'first_year':
      return '1º Ano';

    case 'second_year':
      return '2º Ano';

    case 'third_year':
      return '3º Ano';

    case 'fourth_year':
      return '4º Ano';

    case 'fifth_year':
      return '5º Ano';

    case 'sixth_year':
      return '6º Ano';

    case 'seventh_year':
      return '7º Ano';

    case 'eighth_year':
      return '8º Ano';

    case 'nineth_year':
      return '9º Ano';

    default:
      return '-';
  }
}
