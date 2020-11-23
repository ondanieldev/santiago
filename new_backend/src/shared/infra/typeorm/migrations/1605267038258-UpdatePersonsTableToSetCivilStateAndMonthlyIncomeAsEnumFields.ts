import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdatePersonsTableToSetCivilStateAndMonthlyIncomeAsEnumFields1605267038258
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'persons',
            'civil_state',
            new TableColumn({
                name: 'civil_state',
                type: 'enum',
                enum: ['single', 'married', 'divorced', 'widower', 'separeted'],
            }),
        );

        await queryRunner.changeColumn(
            'persons',
            'monthly_income',
            new TableColumn({
                name: 'monthly_income',
                type: 'enum',
                enum: ['a_class', 'b_class', 'c_class', 'd_class', 'e_class'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'persons',
            'monthly_income',
            new TableColumn({
                name: 'monthly_income',
                type: 'decimal',
            }),
        );

        await queryRunner.changeColumn(
            'persons',
            'civil_state',
            new TableColumn({
                name: 'civil_state',
                type: 'varchar',
            }),
        );
    }
}
