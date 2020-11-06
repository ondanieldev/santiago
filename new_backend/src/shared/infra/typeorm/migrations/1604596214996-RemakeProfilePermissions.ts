import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemakeProfilePermissions1604596214996
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'profiles',
            'new_enrollment_permiss',
            new TableColumn({
                name: 'create_new_enrollments_permiss',
                type: 'boolean',
                default: false,
            }),
        );

        await queryRunner.changeColumn(
            'profiles',
            'validate_enrollment_permiss',
            new TableColumn({
                name: 'validate_enrollments_permiss',
                type: 'boolean',
                default: false,
            }),
        );

        await queryRunner.changeColumn(
            'profiles',
            'pay_debit_permiss',
            new TableColumn({
                name: 'pay_debits_permiss',
                type: 'boolean',
                default: false,
            }),
        );

        await queryRunner.changeColumn(
            'profiles',
            'discharge_payment_permiss',
            new TableColumn({
                name: 'discharge_payments_permiss',
                type: 'boolean',
                default: false,
            }),
        );

        await queryRunner.addColumn(
            'profiles',
            new TableColumn({
                name: 'create_extra_debits_permiss',
                type: 'boolean',
                default: false,
            }),
        );

        await queryRunner.addColumn(
            'profiles',
            new TableColumn({
                name: 'crud_extra_debits_permiss',
                type: 'boolean',
                default: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'profiles',
            'create_new_enrollments_permiss',
            new TableColumn({
                name: 'new_enrollment_permiss',
                type: 'boolean',
                default: false,
            }),
        );

        await queryRunner.changeColumn(
            'profiles',
            'validate_enrollments_permiss',
            new TableColumn({
                name: 'validate_enrollment_permiss',
                type: 'boolean',
                default: false,
            }),
        );

        await queryRunner.changeColumn(
            'profiles',
            'pay_debits_permiss',
            new TableColumn({
                name: 'pay_debit_permiss',
                type: 'boolean',
                default: false,
            }),
        );

        await queryRunner.changeColumn(
            'profiles',
            'discharge_payments_permiss',
            new TableColumn({
                name: 'discharge_payment_permiss',
                type: 'boolean',
                default: false,
            }),
        );

        await queryRunner.dropColumn('profiles', 'create_extra_debits_permiss');

        await queryRunner.dropColumn('profiles', 'crud_extra_debits_permiss');
    }
}
