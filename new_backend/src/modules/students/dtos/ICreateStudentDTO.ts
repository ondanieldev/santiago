export default interface ICreateStudentDTO {
    name: string;
    father_name: string;
    mother_name: string;
    birth_date: Date;
    nacionality: string;
    birth_city: string;
    birth_state: string;
    gender: 'male' | 'female';
    race: 'white' | 'brown' | 'black' | 'indigenous' | 'yellow';
    ease_relating: boolean;
    origin_school?: string;
    health_plan?: string;
    food_alergy?: string;
    medication_alergy?: string;
    health_problem?: string;
    special_necessities?: string;
}
