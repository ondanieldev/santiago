import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateTablePersonsSetIncomeTaxNullAbleAndEducationLevelEnum1603214531826
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'persons',
            'education_level',
            new TableColumn({
                name: 'education_level',
                type: 'enum',
                enum: [
                    'elementary_incompleted',
                    'elementary_completed',
                    'highschool_incompleted',
                    'highschool_completed',
                    'university_incompleted',
                    'university_completed',
                ],
            }),
        );

        await queryRunner.changeColumn(
            'persons',
            'income_tax',
            new TableColumn({
                name: 'income_tax',
                type: 'boolean',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'persons',
            'income_tax',
            new TableColumn({
                name: 'income_tax',
                type: 'boolean',
            }),
        );

        await queryRunner.changeColumn(
            'persons',
            'education_level',
            new TableColumn({
                name: 'education_level',
                type: 'varchar',
            }),
        );
    }
}
