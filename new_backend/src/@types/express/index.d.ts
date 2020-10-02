declare namespace Express {
    interface Request {
        user: {
            id: string;
            crud_grades_permiss: boolean;
            crud_profiles_permiss: boolean;
            crud_users_permiss: boolean;
            discharge_payment_permiss: boolean;
            new_enrollment_permiss: boolean;
            apay_debit_permiss: boolean;
            validate_enrollment_permiss: boolean;
        };
    }
}
